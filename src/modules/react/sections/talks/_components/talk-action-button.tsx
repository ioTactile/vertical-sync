import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/_components/ui/form";
import { Textarea } from "@/app/_components/ui/textarea";
import { useDeleteTalk } from "@/modules/core/mutations/useDeleteTalk";
import { useUserStore } from "@/modules/core/store/store";
import * as React from "react";
import { useAuthAction } from "@/app/_hooks/use-auth-action";
import {
  CreateReportInputs,
  createReportSchema,
} from "@/modules/react/sections/_schemas/create-report";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateReportDto } from "@/modules/core/model/Report";
import { useCreateReport } from "@/modules/core/mutations/useCreateReport";
import { Flag, MoreHorizontal, Trash2 } from "lucide-react";

interface TalkActionButtonProps {
  talkId: string;
  talkAuthorId: string;
}

const TalkActionButton = ({ talkId, talkAuthorId }: TalkActionButtonProps) => {
  const { user } = useUserStore();

  const { handleAuthAction } = useAuthAction();

  const form = useForm<CreateReportInputs>({
    resolver: zodResolver(createReportSchema),
    defaultValues: {
      reason: "",
      entityType: "TALK",
      entityId: talkId,
    },
  });

  const deleteTalkMutation = useDeleteTalk();
  const createReportMutation = useCreateReport();

  const [isReportModalOpen, setIsReportModalOpen] =
    React.useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  const handleDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    deleteTalkMutation.mutate(talkId);
  };

  const onSubmit = (data: CreateReportInputs) => {
    handleAuthAction((user) => {
      const report: CreateReportDto = {
        ...data,
        reporterId: user.id,
      };

      createReportMutation.mutate(report, {
        onSuccess: () => {
          setIsReportModalOpen(false);
          setIsMenuOpen(false);
          form.reset();
        },
      });
    });
  };

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="rounded-full h-8 w-8 p-0 ml-auto z-10"
        >
          <span className="sr-only">Ouvrir le menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {user?.id !== talkAuthorId && (
          <Dialog open={isReportModalOpen} onOpenChange={setIsReportModalOpen}>
            <DialogTrigger asChild>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Flag className="h-4 w-4 mr-2" />
                Signaler le contenu
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Signaler le contenu</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            autoFocus={true}
                            placeholder="Raison du signalement..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Envoyer le signalement
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        )}
        {user?.id === talkAuthorId && (
          <DropdownMenuItem
            className="text-red-500 focus:bg-red-500 focus:text-white"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Supprimer
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TalkActionButton;
