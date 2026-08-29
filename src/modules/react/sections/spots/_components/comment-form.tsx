"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/app/_components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Textarea } from "@/app/_components/ui/textarea";
import { Star } from "lucide-react";
import * as React from "react";
import { useAuthAction } from "@/app/_hooks/use-auth-action";
import { useToast } from "@/app/_hooks/use-toast";
import { useCreateClimbingSpotComment } from "@/modules/core/mutations/useCreateClimbingSpotComment";
import {
  CreateClimbingSpotCommentInputs,
  createClimbingSpotCommentSchema,
} from "@/modules/react/sections/spots/_schemas/create-climbing-spot-comment";

interface CommentFormProps {
  spotId: string;
  onSuccess: () => void;
}

const CommentForm = ({ spotId, onSuccess }: CommentFormProps) => {
  const [hoveredRating, setHoveredRating] = React.useState<number | null>(null);

  const form = useForm<CreateClimbingSpotCommentInputs>({
    resolver: zodResolver(createClimbingSpotCommentSchema) as Resolver<any>,
    defaultValues: {
      content: "",
      notation: 5,
    },
    mode: "onChange",
  });

  const createClimbingSpotComment = useCreateClimbingSpotComment();

  const { handleAuthAction } = useAuthAction();
  const { toast } = useToast();

  const onSubmit: SubmitHandler<CreateClimbingSpotCommentInputs> = (data) => {
    handleAuthAction(async (user) => {
      createClimbingSpotComment.mutate(
        {
          content: data.content,
          notation: data.notation,
          authorId: user.id,
          climbingSpotId: spotId,
        },
        {
          onSuccess: () => {
            toast({
              title: "Succès",
              description: "Votre commentaire a été ajouté avec succès",
            });
            form.reset();
            onSuccess();
          },
          onError: () => {
            toast({
              title: "Erreur",
              description:
                "Une erreur est survenue lors de la publication du commentaire",
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
          name="notation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Star
                      key={rating}
                      className={`h-6 w-6 cursor-pointer ${
                        (hoveredRating || field.value) >= rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      }`}
                      onMouseEnter={() => setHoveredRating(rating)}
                      onMouseLeave={() => setHoveredRating(null)}
                      onClick={() => field.onChange(rating)}
                    />
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Commentaire</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Partagez votre expérience..."
                  {...field}
                  className="min-h-25 shadow-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full rounded-full">
          Publier
        </Button>
      </form>
    </Form>
  );
};

export default CommentForm;
