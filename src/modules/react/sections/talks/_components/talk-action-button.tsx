import { Button } from '@/app/_components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/_components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/_components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/app/_components/ui/form';
import { Textarea } from '@/app/_components/ui/textarea';
import { Flag, MoreHorizontal, Trash2 } from 'lucide-react';
import { useTalkActions } from '@/modules/react/sections/talks/_hooks/use-talk-actions';

interface TalkActionButtonProps {
  talkId: string;
  talkAuthorId: string;
}

const TalkActionButton = ({ talkId, talkAuthorId }: TalkActionButtonProps) => {
  const {
    user,
    form,
    isReportModalOpen,
    setIsReportModalOpen,
    isMenuOpen,
    setIsMenuOpen,
    handleDelete,
    handleReport,
    handleStopPropagation,
  } = useTalkActions(talkId);

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="absolute right-4 top-1 rounded-full h-6 w-6 p-0 ml-auto z-10"
          onClick={handleStopPropagation}
        >
          <span className="sr-only">Ouvrir le menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" onClick={handleStopPropagation}>
        {user?.id !== talkAuthorId && (
          <Dialog open={isReportModalOpen} onOpenChange={setIsReportModalOpen}>
            <DialogTrigger asChild>
              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                onClick={handleStopPropagation}
              >
                <Flag className="h-4 w-4 mr-2" />
                Signaler le contenu
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Signaler le contenu</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleReport)} className="space-y-4">
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
