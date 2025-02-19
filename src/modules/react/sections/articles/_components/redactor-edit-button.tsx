import { Button } from "@/app/_components/ui/button";
import { useUserStore } from "@/modules/core/store/store";
import Link from "next/link";
import { Pencil } from "lucide-react";

interface RedactorEditButtonProps {
  articleId: string;
  articleAuthorId: string;
}

const RedactorEditButton = ({
  articleId,
  articleAuthorId,
}: RedactorEditButtonProps) => {
  const { isRedactor, user } = useUserStore();

  if (!isRedactor || !user) return null;

  if (user.id !== articleAuthorId) return null;

  return (
    <Button
      variant="outline"
      size="sm"
      className="rounded-full bg-primary text-primary-foreground hover:bg-primary/80 absolute top-2 right-2 z-10"
      asChild
    >
      <Link href={`/blog/update?id=${articleId}`}>
        <Pencil />
        Mettre à jour
      </Link>
    </Button>
  );
};

export default RedactorEditButton;
