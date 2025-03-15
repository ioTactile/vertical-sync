"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  createClimbingSpotSchema,
  CreateClimbingSpotInputs,
} from "@/modules/react/sections/spots/_schemas/create-climbing-spot";
import { ClimbingSpotDifficulty, ClimbingSpotType } from "@prisma/client";
import { useAuthAction } from "@/app/_hooks/use-auth-action";
import { useCreateClimbingSpot } from "@/modules/core/mutations/useCreateClimbingSpot";
import { useToast } from "@/app/_hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Textarea } from "@/app/_components/ui/textarea";
import { FileUpload } from "@/app/_components/ui/file-upload";
import { Button } from "@/app/_components/ui/button";
import { Checkbox } from "@/app/_components/ui/checkbox";
import MultiSelectClimbing from "@/modules/react/sections/spots/_components/multi-select-climbing";
import {
  CLIMBING_SPOT_DIFFICULTY_LABELS,
  CLIMBING_SPOT_TYPE_LABELS,
} from "@/types/enum";
import { useS3Upload } from "@/app/_hooks/use-s3-upload";
import * as React from "react";
import { useFileManager } from "@/app/_hooks/use-file-manager";
import FilePreview from "@/app/_components/core/file-preview";

interface ClimbingSpotFormProps {
  onSuccess: () => void;
}

const ClimbingSpotForm = ({ onSuccess }: ClimbingSpotFormProps) => {
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
    },
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
    watch,
  } = form;

  const createClimbingSpotMutation = useCreateClimbingSpot();

  const { handleAuthAction } = useAuthAction();
  const { toast } = useToast();

  const { uploadToS3, deleteFromS3, isUploading } = useS3Upload({
    maxFiles: 5,
  });
  const { files, handleFiles, clearFiles, removeFile } = useFileManager(5);

  const handleCreateClimbingSpotSubmit: SubmitHandler<
    CreateClimbingSpotInputs
  > = (data) => {
    handleAuthAction(async (user) => {
      try {
        let imageUrls: string[] = [];

        if (files.length > 0) {
          imageUrls = await uploadToS3(files);
        }

        const { longitude, latitude, ...rest } = data;
        createClimbingSpotMutation.mutate(
          {
            ...rest,
            imageUrls,
            authorId: user.id,
            coords: {
              type: "Point",
              coordinates: [longitude, latitude],
            },
          },
          {
            onSuccess: () => {
              toast({
                title: "Succès",
                description: "Le spot d'escalade a été créé avec succès",
              });
              clearFiles();
              reset();
              onSuccess();
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
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(handleCreateClimbingSpotSubmit)}
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

        <Button
          type="submit"
          disabled={!isValid || isUploading}
          className="rounded-full self-end"
        >
          Créer le spot
        </Button>
      </form>
    </Form>
  );
};

export default ClimbingSpotForm;
