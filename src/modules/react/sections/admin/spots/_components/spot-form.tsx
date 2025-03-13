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

interface SpotFormProps {
  mode: "create" | "update";
  initialData?: GetClimbingSpotResponse;
}

const SpotForm = ({ mode, initialData }: SpotFormProps) => {
  const form = useForm<CreateClimbingSpotInputs>({
    resolver: zodResolver(createClimbingSpotSchema),
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

  console.log(isValid);

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
      setValue("status", rest.status);
    }
  }, [initialData, setValue]);

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
    CreateClimbingSpotInputs
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

      if (mode === "create") {
        try {
          let imageUrls: string[] = [];

          if (files.length > 0) {
            imageUrls = await uploadToS3(files);
          }

          createClimbingSpotMutation.mutate(
            {
              ...spot,
              imageUrls,
              authorId: user.id,
            },
            {
              onSuccess: () => {
                toast({
                  title: "Succès",
                  description: "Le spot d'escalade a été créé avec succès",
                });
                clearFiles();
                reset();
                router.push("/admin/spots");
              },
              onError: () => {
                toast({
                  title: "Erreur",
                  description:
                    "Une erreur est survenue lors de la création du spot d'escalade",
                });
              },
            }
          );
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
      } else {
        updateClimbingSpotMutation.mutate(
          {
            ...spot,
            id: initialData!.id,
            updatedAt: new Date(),
          },
          {
            onSuccess: () => {
              reset();
              router.push("/admin/spots");
            },
          }
        );
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(handleCreateOrUpdateClimbingSpotSubmit)}
        className="flex flex-col gap-6"
      >
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
                <label>Parking disponible</label>
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
                <label>Toilettes disponibles</label>
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
                <Select value={field.value} onValueChange={field.onChange}>
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
                          <SelectItem
                            key={status}
                            value={status}
                            defaultValue={ClimbingSpotStatus.PENDING}
                          >
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
