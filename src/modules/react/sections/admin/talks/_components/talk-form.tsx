'use client';

import { Textarea } from '@/app/_components/ui/textarea';
import { Button } from '@/app/_components/ui/button';
import { Resolver, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateTalkInputs } from '@/modules/react/sections/talks/_schemas/create-talk';
import { createTalkSchema } from '@/modules/react/sections/talks/_schemas/create-talk';
import * as React from 'react';
import { TALK_TITLE_MAX_LENGTH } from '@/app/_constants/app';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/app/_components/ui/form';
import { useUpdateTalk } from '@/modules/core/mutations/useUpdateTalk';
import { useCreateTalk } from '@/modules/core/mutations/useCreateTalk';
import { GetTalkWithCommentsResponse } from '@/modules/core/model/Talk';
import { useRouter } from 'next/navigation';
import { useAuthAction } from '@/app/_hooks/use-auth-action';
import TipTapEditor from '@/app/_components/core/tiptap-editor';

interface TalkFormProps {
  mode: 'create' | 'update';
  initialData?: GetTalkWithCommentsResponse;
}

const TalkForm = ({ mode, initialData }: TalkFormProps) => {
  const form = useForm<CreateTalkInputs>({
    resolver: zodResolver(createTalkSchema) as Resolver<CreateTalkInputs>,
    defaultValues: {
      title: '',
      content: '',
    },
    mode: 'onChange',
  });

  const {
    control,
    setValue,
    handleSubmit,
    formState: { isValid },
    reset,
  } = form;

  React.useEffect(() => {
    if (initialData) {
      setValue('title', initialData.title);
      setValue('content', initialData.content);
    }
  }, [initialData, setValue]);

  const router = useRouter();

  const updateTalkMutation = useUpdateTalk();
  const createTalkMutation = useCreateTalk();

  const { handleAuthAction } = useAuthAction();

  const handleCreateTalkSubmit: SubmitHandler<CreateTalkInputs> = (data) => {
    handleAuthAction((user) => {
      const talk = {
        title: data.title,
        content: data.content,
      };

      if (mode === 'create') {
        createTalkMutation.mutate(
          {
            ...talk,
            authorId: user.id,
          },
          {
            onSuccess: () => {
              reset();
              router.push('/admin/talks');
            },
          },
        );
      } else {
        updateTalkMutation.mutate(
          {
            ...talk,
            id: initialData!.id,
            updatedAt: new Date(),
          },
          {
            onSuccess: () => {
              reset();
              router.push('/admin/talks');
            },
          },
        );
      }
    });
  };

  const title = useWatch({ control, name: 'title' }) ?? '';
  const titleSize = title.length;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleCreateTalkSubmit)} className="flex flex-col gap-6">
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
          name="content"
          render={() => (
            <FormItem>
              <FormControl>
                <TipTapEditor control={control} name="content" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={!isValid} className="rounded-full self-end">
          {mode === 'create' ? 'Créer' : 'Mettre à jour'}
        </Button>
      </form>
    </Form>
  );
};

export default TalkForm;
