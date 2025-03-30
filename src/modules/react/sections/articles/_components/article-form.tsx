"use client";

import { Textarea } from "@/app/_components/ui/textarea";
import { Button } from "@/app/_components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createArticleSchema,
  CreateArticleInputs,
} from "@/modules/react/sections/admin/articles/_schemas/create-article";
import * as React from "react";
import {
  TALK_TITLE_MAX_LENGTH,
  TALK_EXCERPT_MAX_LENGTH,
} from "@/app/_constants/app";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { useToast } from "@/app/_hooks/use-toast";
import { useUpdateArticle } from "@/modules/core/mutations/useUpdateArticle";
import { useCreateArticle } from "@/modules/core/mutations/useCreateArticle";
import {
  CreateArticleDto,
  GetArticleWithRelationsResponse,
} from "@/modules/core/model/Article";
import { useRouter } from "next/navigation";
import MultiSelectTags from "@/modules/react/sections/admin/articles/_components/multi-select-tags";
import { useAuthAction } from "@/app/_hooks/use-auth-action";
import { useS3Upload } from "@/app/_hooks/use-s3-upload";
import { useFileManager } from "@/app/_hooks/use-file-manager";
import { FileUpload } from "@/app/_components/ui/file-upload";
import FilePreview from "@/app/_components/core/file-preview";
import {
  UpdateArticleInputs,
  updateArticleSchema,
} from "@/modules/react/sections/admin/articles/_schemas/update-article";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { useUserStore } from "@/modules/core/store/store";
import TipTapEditor from "@/app/_components/core/tiptap-editor";

interface ArticleFormProps {
  mode: "create" | "update";
  initialData?: GetArticleWithRelationsResponse;
}

const ArticleForm = ({ mode, initialData }: ArticleFormProps) => {
  const { toast } = useToast();

  const { isAdmin } = useUserStore();

  const form = useForm<
    typeof mode extends "create" ? CreateArticleInputs : UpdateArticleInputs
  >({
    resolver: zodResolver(
      mode === "create" ? createArticleSchema : updateArticleSchema
    ),
    defaultValues: {
      title: "",
      content: "",
      imageUrl: null,
      excerpt: null,
      published: false,
      articleTags: [],
    },
    mode: "onChange",
  });

  console.log(form.watch("content"));

  const {
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { isValid },
    reset,
  } = form;

  React.useEffect(() => {
    if (initialData) {
      setValue("title", initialData.title);
      setValue("content", initialData.content);
      setValue("imageUrl", initialData.imageUrl);
      setValue("excerpt", initialData.excerpt);
      setValue(
        "articleTags",
        initialData.articleTags.map((tag) => ({
          id: tag.tagId,
          name: tag.tag.name,
        }))
      );
      setValue("published", initialData.published);
    }
  }, [initialData, setValue]);

  const router = useRouter();

  const updateArticleMutation = useUpdateArticle();
  const createArticleMutation = useCreateArticle();

  const { handleAuthAction } = useAuthAction();

  const { uploadToS3, deleteFromS3, isUploading } = useS3Upload({
    maxFiles: 5,
  });
  const { files, handleFiles, clearFiles, removeFile } = useFileManager(5);

  const handleCreateArticleSubmit: SubmitHandler<
    typeof mode extends "create" ? CreateArticleInputs : UpdateArticleInputs
  > = (data) => {
    handleAuthAction(async (user) => {
      const article: Omit<CreateArticleDto, "authorId"> = {
        title: data.title,
        content: data.content,
        imageUrl: data.imageUrl || null,
        excerpt: data.excerpt || null,
        articleTags: data.articleTags,
        published: data.published,
      };

      if (mode === "create") {
        try {
          let imageUrls: string[] = [];

          if (files.length > 0) {
            imageUrls = await uploadToS3(files);
          }
          createArticleMutation.mutate(
            {
              ...article,
              imageUrl: imageUrls[0],
              authorId: user.id,
            },
            {
              onSuccess: () => {
                clearFiles();
                reset();
                router.push("/blog");
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

  const [titleSize, setTitleSize] = React.useState<number>(0);
  const [excerptSize, setExcerptSize] = React.useState<number>(0);

  const title = watch("title");
  const excerpt = watch("excerpt");

  React.useEffect(() => {
    setTitleSize(title.length);
  }, [title]);

  React.useEffect(() => {
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
          control={form.control}
          name="content"
          render={() => (
            <FormItem>
              <FormLabel>Corps*</FormLabel>
              <FormControl>
                <TipTapEditor
                  control={control}
                  name="content"
                  placeholder={
                    mode === "create"
                      ? "Rédigez votre article ici..."
                      : "Modifier votre article ici..."
                  }
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FilePreview files={files} onRemove={removeFile} />

        <FileUpload
          maxFiles={5}
          onUpload={handleFiles}
          isLoading={isUploading}
          className="rounded-xl"
          label={
            watch("imageUrl") ? "Modifier l'image" : "Déposer votre image ici"
          }
        />

        <MultiSelectTags control={control} />

        {isAdmin && (
          <FormField
            control={control}
            name="published"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Publié l&apos;article</FormLabel>
              </FormItem>
            )}
          />
        )}

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
