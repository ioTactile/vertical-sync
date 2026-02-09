"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { Textarea } from "@/app/_components/ui/textarea";
import { Button } from "@/app/_components/ui/button";
import { useAuthAction } from "@/app/_hooks/use-auth-action";
import { useToast } from "@/app/_hooks/use-toast";
import { useCreateClimbingSpotConditionReport } from "@/modules/core/mutations/useCreateClimbingSpotConditionReport";
import type { CrowdLevel, RockState } from "@/modules/core/model/ClimbingSpotConditions";
import {
  CreateClimbingSpotConditionInputs,
  createClimbingSpotConditionSchema,
} from "@/modules/react/sections/spots/_schemas/create-climbing-spot-condition";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

const ROCK_STATE_OPTIONS: RockState[] = ["DRY", "DAMP", "WET"];
const CROWD_LEVEL_OPTIONS: CrowdLevel[] = [
  "EMPTY",
  "FEW_PEOPLE",
  "BUSY",
  "PACKED",
];

const ROCK_STATE_LABELS: Record<RockState, string> = {
  DRY: "Sèche",
  DAMP: "Humide",
  WET: "Mouillée",
};

const CROWD_LEVEL_LABELS: Record<CrowdLevel, string> = {
  EMPTY: "Vide",
  FEW_PEOPLE: "Quelques personnes",
  BUSY: "Fréquenté",
  PACKED: "Comblé",
};

interface SpotConditionsFormProps {
  spotId: string;
  onSuccess: () => void;
}

const SpotConditionsForm = ({ spotId, onSuccess }: SpotConditionsFormProps) => {
  const form = useForm<CreateClimbingSpotConditionInputs>({
    resolver: zodResolver(createClimbingSpotConditionSchema),
    defaultValues: {
      rockState: undefined,
      crowdLevel: undefined,
      comment: "",
    },
    mode: "onChange",
  });

  const createReport = useCreateClimbingSpotConditionReport();
  const { handleAuthAction } = useAuthAction();
  const { toast } = useToast();

  const onSubmit: SubmitHandler<CreateClimbingSpotConditionInputs> = (data) => {
    handleAuthAction(async (user) => {
      createReport.mutate(
        {
          climbingSpotId: spotId,
          authorId: user.id,
          rockState: data.rockState,
          crowdLevel: data.crowdLevel,
          comment: data.comment || null,
        },
        {
          onSuccess: () => {
            toast({
              title: "Merci",
              description: "Vos conditions ont été enregistrées",
            });
            form.reset();
            onSuccess();
          },
          onError: () => {
            toast({
              title: "Erreur",
              description:
                "Une erreur est survenue lors de l'envoi du signalement",
              variant: "destructive",
            });
          },
        },
      );
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="rockState"
          render={({ field }) => (
            <FormItem>
              <FormLabel>État de la roche</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="z-[3000]">
                  {ROCK_STATE_OPTIONS.map((value) => (
                    <SelectItem key={value} value={value}>
                      {ROCK_STATE_LABELS[value]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="crowdLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Affluence</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="z-[3000]">
                  {CROWD_LEVEL_OPTIONS.map((value) => (
                    <SelectItem key={value} value={value}>
                      {CROWD_LEVEL_LABELS[value]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Commentaire (optionnel)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Détails éventuels..."
                  {...field}
                  value={field.value ?? ""}
                  className="min-h-[80px] shadow-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full rounded-full">
          Envoyer
        </Button>
      </form>
    </Form>
  );
};

export default SpotConditionsForm;
