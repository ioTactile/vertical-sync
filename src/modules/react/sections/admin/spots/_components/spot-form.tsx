"use client";

import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { useCreateClimbingSpot } from "@/modules/core/mutations/useCreateClimbingSpot";
import { useUpdateClimbingSpot } from "@/modules/core/mutations/useUpdateClimbingSpot";
import * as React from "react";
import { useRouter } from "next/navigation";
import { GetClimbingSpotResponse } from "@/modules/core/model/ClimbingSpot";
import { useAuthAction } from "@/app/_hooks/use-auth-action";
import { createClimbingSpotSchema } from "@/modules/react/sections/spots/_schemas/create-climbing-spot";
import { CreateClimbingSpotInputs } from "@/modules/react/sections/spots/_schemas/create-climbing-spot";
import { useS3Upload } from "@/app/_hooks/use-s3-upload";
import { useFileManager } from "@/app/_hooks/use-file-manager";
import { useToast } from "@/app/_hooks/use-toast";
import MultiSelectClimbing from "@/modules/react/sections/spots/_components/multi-select-climbing";
import {
  CLIMBING_SPOT_DIFFICULTY_LABELS,
  CLIMBING_SPOT_STATUS_LABELS,
  CLIMBING_SPOT_TYPE_LABELS,
} from "@/types/enum";
import {
  ClimbingSpotDifficulty,
  ClimbingSpotStatus,
  ClimbingSpotType,
} from "@prisma/client";
import FilePreview from "@/app/_components/core/file-preview";
import { FileUpload } from "@/app/_components/ui/file-upload";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { Textarea } from "@/app/_components/ui/textarea";
import { extractCoords } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/app/_components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import ImageUrlPreview from "@/app/_components/core/image-url-preview";
import {
  UpdateClimbingSpotInputs,
  updateClimbingSpotSchema,
} from "@/modules/react/sections/admin/spots/_schemas/update-climbing-spot";
import { ModalCoordinateMap } from "@/modules/react/sections/_components/modal-coordinate-map";
import { useModalCoordinateMap } from "@/modules/react/sections/_hooks/use-modal-coordinate-map";
import { useGoogleMaps } from "@/app/_hooks/use-google-maps";
import type { AddressComponent } from "@/types/google-maps.types";
import { PlaceSearch } from "./place-search-input";

interface SpotFormProps {
  mode: "create" | "update";
  initialData?: GetClimbingSpotResponse;
}

const SpotForm = ({ mode, initialData }: SpotFormProps) => {
  const { isLoaded, error } = useGoogleMaps();

  console.log(error);

  const form = useForm<
    typeof mode extends "update"
      ? UpdateClimbingSpotInputs
      : CreateClimbingSpotInputs
  >({
    resolver: zodResolver(
      mode === "update" ? updateClimbingSpotSchema : createClimbingSpotSchema
    ),
    defaultValues: {
      name: "",
      description: null,
      country: null,
      city: null,
      latitude: 0,
      longitude: 0,
      imageUrls: [],
      types: [],
      difficulties: [],
      bestPeriod: null,
      address: null,
      websiteUrl: null,
      phoneNumber: null,
      email: null,
      parkingAvailable: null,
      toiletsAvailable: null,
      status: ClimbingSpotStatus.PENDING,
    },
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
    setValue,
    watch,
  } = form;

  React.useEffect(() => {
    if (initialData) {
      const { coords, ...rest } = initialData;
      setValue("name", rest.name);
      setValue("description", rest.description);
      setValue("country", rest.country);
      setValue("city", rest.city);
      setValue("latitude", extractCoords(coords).latitude);
      setValue("longitude", extractCoords(coords).longitude);
      setValue("imageUrls", rest.imageUrls);
      setValue("types", rest.types);
      setValue("difficulties", rest.difficulties);
      setValue("bestPeriod", rest.bestPeriod);
      setValue("address", rest.address);
      setValue("websiteUrl", rest.websiteUrl);
      setValue("phoneNumber", rest.phoneNumber);
      setValue("email", rest.email);
      setValue("parkingAvailable", rest.parkingAvailable);
      setValue("toiletsAvailable", rest.toiletsAvailable);
      if (mode === "update") {
        setValue("status", rest.status);
      }
    }
  }, [initialData, setValue, mode]);

  const router = useRouter();

  const createClimbingSpotMutation = useCreateClimbingSpot();
  const updateClimbingSpotMutation = useUpdateClimbingSpot();

  const { handleAuthAction } = useAuthAction();

  const { toast } = useToast();

  const { uploadToS3, deleteFromS3, isUploading } = useS3Upload({
    maxFiles: 5,
  });
  const { files, handleFiles, clearFiles, removeFile } = useFileManager(5);

  const handleCreateOrUpdateClimbingSpotSubmit: SubmitHandler<
    typeof mode extends "update"
      ? UpdateClimbingSpotInputs
      : CreateClimbingSpotInputs
  > = (data) => {
    handleAuthAction(async (user) => {
      const spot = {
        name: data.name,
        description: data.description,
        country: data.country,
        city: data.city,
        coords: {
          type: "Point" as const,
          coordinates: [data.longitude, data.latitude] as [number, number],
        },
        imageUrls: data.imageUrls,
        types: data.types,
        difficulties: data.difficulties,
        bestPeriod: data.bestPeriod,
        address: data.address,
        websiteUrl: data.websiteUrl,
        phoneNumber: data.phoneNumber,
        email: data.email,
        parkingAvailable: data.parkingAvailable,
        toiletsAvailable: data.toiletsAvailable,
        status: data.status,
      };

      try {
        let imageUrls: string[] = [...(data.imageUrls || [])];

        if (mode === "update") {
          const imagesToDelete = initialData?.imageUrls.filter(
            (url) => !data.imageUrls.includes(url)
          );
          if (imagesToDelete && imagesToDelete.length > 0) {
            await deleteFromS3(
              imagesToDelete.map((url) => url.split("/").pop() || "")
            );
          }
        }

        if (files.length > 0) {
          const newImageUrls = await uploadToS3(files);
          imageUrls = [...imageUrls, ...newImageUrls];
        }

        if (mode === "create") {
          createClimbingSpotMutation.mutate(
            {
              ...spot,
              imageUrls,
              authorId: user.id,
            },
            {
              onSuccess: () => {
                clearFiles();
                reset();
                router.push("/admin/spots");
              },
            }
          );
        } else {
          updateClimbingSpotMutation.mutate(
            {
              ...spot,
              id: initialData!.id,
              imageUrls,
              updatedAt: new Date(),
            },
            {
              onSuccess: () => {
                clearFiles();
                reset();
                router.push("/admin/spots");
              },
            }
          );
        }
      } catch (error: unknown) {
        console.error(error);
        if (files.length > 0) {
          await deleteFromS3(files.map((file) => file.name));
        }
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de l'upload des images",
          variant: "destructive",
        });
      }
    });
  };

  const handleRemoveImageUrl = (url: string) => {
    const newImageUrls = watch("imageUrls").filter(
      (imageUrl) => imageUrl !== url
    );
    setValue("imageUrls", newImageUrls);
  };

  const {
    isMapOpen,
    selectedCoordinates,
    setIsMapOpen,
    handleCoordinateSelection: baseHandleCoordinateSelection,
  } = useModalCoordinateMap();

  const handleCoordinateSelection = (coords: [number, number]) => {
    setValue("latitude", coords[0]);
    setValue("longitude", coords[1]);
    baseHandleCoordinateSelection(coords);
  };

  const handlePlaceSelect = (place: google.maps.places.PlaceResult) => {
    console.log(place);

    if (!place.geometry?.location) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    const country =
      place.address_components?.find((component: AddressComponent) =>
        component.types.includes("country")
      )?.long_name || "";

    const city =
      place.address_components?.find((component: AddressComponent) =>
        component.types.includes("locality")
      )?.long_name || "";

    const address = place.formatted_address || "";

    setValue("name", place.name || "");
    setValue("latitude", lat);
    setValue("longitude", lng);
    setValue("country", country);
    setValue("city", city);
    setValue("address", address);
    setValue("websiteUrl", place.website || "");
    setValue(
      "phoneNumber",
      place.formatted_phone_number || place.international_phone_number || ""
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(handleCreateOrUpdateClimbingSpotSubmit)}
        className="flex flex-col gap-6"
      >
        <PlaceSearch onPlaceSelect={handlePlaceSelect} isLoaded={isLoaded} />

        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Nom du spot*" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Description du spot"
                  {...field}
                  value={field.value || ""}
                  className="shadow-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Pays"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Ville"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="latitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Latitude*</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Ex: 48.8566"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="longitude"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Longitude*</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Ex: 2.3522"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <ModalCoordinateMap
            isMapOpen={isMapOpen}
            setIsMapOpen={setIsMapOpen}
            selectedCoordinates={selectedCoordinates}
            handleCoordinateSelection={handleCoordinateSelection}
          />
        </div>

        <MultiSelectClimbing
          control={control}
          name="types"
          placeholder="Types d'escalade*"
          options={Object.values(ClimbingSpotType).map((type) => ({
            label: CLIMBING_SPOT_TYPE_LABELS[type],
            value: type,
          }))}
        />

        <MultiSelectClimbing
          control={control}
          name="difficulties"
          placeholder="Niveaux de difficulté*"
          options={Object.values(ClimbingSpotDifficulty).map((difficulty) => ({
            label: CLIMBING_SPOT_DIFFICULTY_LABELS[difficulty],
            value: difficulty,
          }))}
        />

        <ImageUrlPreview
          imageUrls={watch("imageUrls")}
          onRemove={handleRemoveImageUrl}
        />

        <FilePreview files={files} onRemove={removeFile} />

        <FileUpload
          maxFiles={5}
          onUpload={handleFiles}
          isLoading={isUploading}
          className="rounded-xl"
          label={
            watch("imageUrls").length > 0
              ? "Ajouter plus d'images"
              : "Déposer vos images ici"
          }
        />

        <FormField
          control={control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse</FormLabel>
              <FormControl>
                <Input
                  placeholder="Adresse"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="websiteUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Site web</FormLabel>
              <FormControl>
                <Input
                  placeholder="Site web"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone</FormLabel>
              <FormControl>
                <Input
                  placeholder="Téléphone"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Email"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="bestPeriod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meilleur moment</FormLabel>
              <FormControl>
                <Input
                  placeholder="Meilleur moment"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="parkingAvailable"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value || false}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Parking disponible</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="toiletsAvailable"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value || false}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Toilettes disponibles</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  value={field.value || initialData?.status}
                  onValueChange={field.onChange}
                >
                  <FormItem>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Statut" />
                      </SelectTrigger>
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormControl>
                      <SelectContent>
                        {Object.values(ClimbingSpotStatus).map((status) => (
                          <SelectItem key={status} value={status}>
                            {CLIMBING_SPOT_STATUS_LABELS[status]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </FormControl>
                  </FormItem>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={!isValid || isUploading}
          className="rounded-full self-end"
        >
          {mode === "create" ? "Créer" : "Mettre à jour"}
        </Button>
      </form>
    </Form>
  );
};

export default SpotForm;
