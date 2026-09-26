'use client';

import * as React from 'react';
import { Button } from '@/app/_components/ui/button';
import { Checkbox } from '@/app/_components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/_components/ui/form';
import { Input } from '@/app/_components/ui/input';
import { useAuthAction } from '@/app/_hooks/use-auth-action';
import { useToast } from '@/app/_hooks/use-toast';
import { useCreateClimbingSpotAlert } from '@/modules/core/mutations/useCreateClimbingSpotAlert';
import type { GetClimbingSpotAlertResponse } from '@/modules/core/model/ClimbingSpotAlert';
import {
  CreateClimbingSpotAlertInputs,
  createClimbingSpotAlertSchema,
} from '@/modules/react/sections/spots/_schemas/create-climbing-spot-alert';
import { zodResolver } from '@hookform/resolvers/zod';
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';

interface ClimbingSpotAlertFormProps {
  spotId: string;
  existingAlert?: GetClimbingSpotAlertResponse | null;
  onSuccess: () => void;
  onDelete?: () => void;
}

const ClimbingSpotAlertForm = ({
  spotId,
  existingAlert,
  onSuccess,
  onDelete,
}: ClimbingSpotAlertFormProps) => {
  const form = useForm<CreateClimbingSpotAlertInputs>({
    resolver: zodResolver(createClimbingSpotAlertSchema) as Resolver<CreateClimbingSpotAlertInputs>,
    defaultValues: {
      minTempC: existingAlert?.minTempC ?? undefined,
      maxTempC: existingAlert?.maxTempC ?? undefined,
      maxWindKmh: existingAlert?.maxWindKmh ?? undefined,
      onlyWeekends: existingAlert?.onlyWeekends ?? false,
      avoidRain: existingAlert?.avoidRain ?? true,
    },
    mode: 'onChange',
  });

  React.useEffect(() => {
    form.reset({
      minTempC: existingAlert?.minTempC ?? undefined,
      maxTempC: existingAlert?.maxTempC ?? undefined,
      maxWindKmh: existingAlert?.maxWindKmh ?? undefined,
      onlyWeekends: existingAlert?.onlyWeekends ?? false,
      avoidRain: existingAlert?.avoidRain ?? true,
    });
  }, [existingAlert, form]);

  const createAlert = useCreateClimbingSpotAlert();
  const { handleAuthAction } = useAuthAction();
  const { toast } = useToast();

  const onSubmit: SubmitHandler<CreateClimbingSpotAlertInputs> = (data) => {
    handleAuthAction(async (user) => {
      createAlert.mutate(
        {
          spotId,
          data: {
            climbingSpotId: spotId,
            userId: user.id,
            minTempC: data.minTempC ?? null,
            maxTempC: data.maxTempC ?? null,
            maxWindKmh: data.maxWindKmh ?? null,
            onlyWeekends: data.onlyWeekends,
            avoidRain: data.avoidRain,
          },
        },
        {
          onSuccess: () => {
            toast({
              title: existingAlert ? 'Alerte mise à jour' : 'Alerte créée',
              description: 'Vous serez notifié quand les conditions seront favorables.',
            });
            form.reset(form.getValues());
            onSuccess();
          },
          onError: () => {
            toast({
              title: 'Erreur',
              description: "Impossible d'enregistrer l'alerte",
              variant: 'destructive',
            });
          },
        },
      );
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="minTempC"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Température min (°C)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step={1}
                    placeholder="ex. 5"
                    {...field}
                    value={field.value ?? ''}
                    onChange={(e) => {
                      const v = e.target.value;
                      field.onChange(v === '' ? undefined : Number(v));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxTempC"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Température max (°C)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step={1}
                    placeholder="ex. 25"
                    {...field}
                    value={field.value ?? ''}
                    onChange={(e) => {
                      const v = e.target.value;
                      field.onChange(v === '' ? undefined : Number(v));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="maxWindKmh"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vent max (km/h)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step={1}
                  min={0}
                  placeholder="ex. 30"
                  {...field}
                  value={field.value ?? ''}
                  onChange={(e) => {
                    const v = e.target.value;
                    field.onChange(v === '' ? undefined : Number(v));
                  }}
                />
              </FormControl>
              <FormDescription>Alerte uniquement si le vent reste sous ce seuil.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="onlyWeekends"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Uniquement les week-ends</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="avoidRain"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Éviter la pluie</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button type="submit" className="flex-1 rounded-full">
            {existingAlert ? "Mettre à jour l'alerte" : "Créer l'alerte"}
          </Button>
          {existingAlert && onDelete && (
            <Button type="button" variant="outline" onClick={onDelete} className="rounded-full">
              Supprimer
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default ClimbingSpotAlertForm;
