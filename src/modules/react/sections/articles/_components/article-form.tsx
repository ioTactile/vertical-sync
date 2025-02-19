"use client";

import { Textarea } from "@/app/_components/ui/textarea";
import { Button } from "@/app/_components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createArticleSchema,
  CreateArticleInputs,
} from "@/modules/react/sections/admin/articles/_schemas/create-article";
import { useEffect, useState } from "react";
import {
  TALK_TITLE_MAX_LENGTH,
  TALK_EXCERPT_MAX_LENGTH,
} from "@/app/_constants/app";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/_components/ui/form";
import { UploadDropzone } from "@/lib/uploadthing";
import { useToast } from "@/app/_hooks/use-toast";
import Image from "next/image";
import { useUpdateArticle } from "@/modules/core/mutations/useUpdateArticle";
import { useCreateArticle } from "@/modules/core/mutations/useCreateArticle";
import {
  CreateArticleDto,
  GetArticleResponse,
} from "@/modules/core/model/Article";
import { useRouter } from "next/navigation";
import MultiSelectTags from "@/modules/react/sections/admin/articles/_components/multi-select-tags";
import { useAuthAction } from "@/app/_hooks/use-auth-action";

interface ArticleFormProps {
  mode: "create" | "update";
  initialData?: GetArticleResponse;
}

const ArticleForm = ({ mode, initialData }: ArticleFormProps) => {
  const { toast } = useToast();

  const form = useForm<CreateArticleInputs>({
    resolver: zodResolver(createArticleSchema),
    defaultValues: {
      title: "",
      content: "",
      imageUrl: null,
      imageName: null,
      excerpt: null,
      articleTags: [],
    },
    mode: "onChange",
  });

  const {
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { isValid },
    reset,
  } = form;

  useEffect(() => {
    if (initialData) {
      setValue("title", initialData.title);
      setValue("content", initialData.content);
      setValue("imageUrl", initialData.imageUrl);
      setValue("imageName", initialData.imageName);
      setValue("excerpt", initialData.excerpt);
      setValue(
        "articleTags",
        initialData.articleTags.map((tag) => ({
          id: tag.tagId,
          name: tag.tag.name,
        }))
      );
    }
  }, [initialData, setValue]);

  const router = useRouter();

  const updateArticleMutation = useUpdateArticle();
  const createArticleMutation = useCreateArticle();

  const { handleAuthAction } = useAuthAction();

  const handleCreateArticleSubmit: SubmitHandler<CreateArticleInputs> = (
    data
  ) => {
    handleAuthAction((user) => {
      const article: Omit<CreateArticleDto, "authorId"> = {
        title: data.title,
        content: data.content,
        imageUrl: data.imageUrl || null,
        imageName: data.imageName || null,
        excerpt: data.excerpt || null,
        articleTags: data.articleTags,
      };

      if (mode === "create") {
        createArticleMutation.mutate(
          {
            ...article,
            authorId: user.id,
          },
          {
            onSuccess: () => {
              reset();
              router.push("/blog");
            },
          }
        );
      } else {
        updateArticleMutation.mutate(
          {
            ...article,
            id: initialData!.id,
            updatedAt: new Date(),
          },
          {
            onSuccess: () => {
              reset();
              router.push("/blog");
            },
          }
        );
      }
    });
  };

  const [titleSize, setTitleSize] = useState<number>(0);
  const [excerptSize, setExcerptSize] = useState<number>(0);

  const title = watch("title");
  const excerpt = watch("excerpt");

  useEffect(() => {
    setTitleSize(title.length);
  }, [title]);

  useEffect(() => {
    if (excerpt) {
      setExcerptSize(excerpt.length);
    }
  }, [excerpt]);

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(handleCreateArticleSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Titre*"
                  {...field}
                  maxLength={TALK_TITLE_MAX_LENGTH}
                  className="resize-none shadow-none"
                />
              </FormControl>
              <div className="flex justify-between items-center mx-2">
                <FormMessage />
                <span className="text-xs text-muted-foreground ml-auto">
                  {titleSize}/{TALK_TITLE_MAX_LENGTH}
                </span>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Résumé"
                  {...field}
                  value={field.value || ""}
                  maxLength={TALK_EXCERPT_MAX_LENGTH}
                  className="shadow-none"
                />
              </FormControl>
              <div className="flex justify-between items-center mx-2">
                <FormMessage />
                <span className="text-xs text-muted-foreground ml-auto">
                  {excerptSize}/{TALK_EXCERPT_MAX_LENGTH}
                </span>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Corps*"
                  {...field}
                  className="shadow-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {watch("imageUrl") && (
          <div className="aspect-video overflow-hidden rounded-xl">
            <Image
              src={watch("imageUrl") as string}
              alt={watch("imageName") as string}
              width={500}
              height={500}
              className="object-cover size-full"
            />
          </div>
        )}

        <UploadDropzone
          content={{
            label: watch("imageName") ? "Changer l'image" : "Ajouter une image",
            button: "Sélectionner une image",
          }}
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            const file = res[0];
            setValue("imageUrl", file.url);
            setValue("imageName", file.name);
          }}
          onUploadError={() => {
            toast({
              title: "Erreur",
              description: "Une erreur est survenue lors de l'upload",
            });
          }}
          className="rounded-xl ut-button:w-48 ut-button:bg-primary ut-button:text-primary-foreground ut-label:text-foreground ut-allowed-content:text-foreground"
        />

        <MultiSelectTags control={control} />

        <Button
          type="submit"
          disabled={!isValid}
          className="rounded-full self-end"
        >
          {mode === "create" ? "Créer" : "Mettre à jour"}
        </Button>
      </form>
    </Form>
  );
};

export default ArticleForm;
