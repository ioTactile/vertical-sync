import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { useCreateTalkComment } from "@/modules/core/mutations/useCreateTalkComment";
import * as React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/_components/ui/form";
import {
  CreateTalkCommentInputs,
  createTalkCommentSchema,
} from "@/modules/react/sections/talks/_schemas/create-talk-comment";
import { Textarea } from "@/app/_components/ui/textarea";
import { Button } from "@/app/_components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthAction } from "@/app/_hooks/use-auth-action";

interface TalkCommentFormProps {
  talkId: string;
  replyToUserId: string | null;
  replyToId: string | null;
  onCancel?: () => void;
  isExpandedFromParent?: boolean;
}

const TalkCommentForm = ({
  talkId,
  replyToUserId,
  replyToId,
  onCancel,
  isExpandedFromParent,
}: TalkCommentFormProps) => {
  const form = useForm<CreateTalkCommentInputs>({
    resolver: zodResolver(createTalkCommentSchema) as Resolver<any>,
    defaultValues: {
      content: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
  } = form;

  const createTalkCommentMutation = useCreateTalkComment();

  const { handleAuthAction } = useAuthAction();

  const handleCreateTalkCommentSubmit: SubmitHandler<
    CreateTalkCommentInputs
  > = (data) => {
    handleAuthAction((user) => {
      const talkComment = {
        content: data.content,
        authorId: user.id,
        talkId: talkId,
        replyToId: replyToId,
        replyToUserId: replyToUserId,
      };

      createTalkCommentMutation.mutate(talkComment, {
        onSuccess: () => {
          reset();
        },
      });

      if (isExpanded) setIsExpanded(false);
      if (onCancel) onCancel();
    });
  };

  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (isExpandedFromParent) setIsExpanded(true);
  }, [isExpandedFromParent]);

  function handleClick() {
    if (onCancel) onCancel();
    setIsExpanded(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleCreateTalkCommentSubmit)}>
        {isExpanded ? (
          <div className="border rounded-xl overflow-hidden">
            <FormField
              control={control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      autoFocus
                      className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
                    />
                  </FormControl>
                  <div className="flex justify-between items-center bg-primary/20 p-2 border-t px-2">
                    <FormMessage />
                    <div className="space-x-2 ml-auto">
                      <Button
                        onClick={handleClick}
                        variant="ghost"
                        size="sm"
                        className="rounded-full"
                      >
                        Annuler
                      </Button>
                      <Button
                        type="submit"
                        disabled={!isValid}
                        size="sm"
                        className="rounded-full"
                      >
                        Commentaire
                      </Button>
                    </div>
                  </div>
                </FormItem>
              )}
            />
          </div>
        ) : (
          <Button
            onClick={() => setIsExpanded(true)}
            variant="outline"
            className="w-full shadow-none rounded-full justify-start"
          >
            Ajouter un commentaire
          </Button>
        )}
      </form>
    </Form>
  );
};

export default TalkCommentForm;
