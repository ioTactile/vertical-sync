import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import Link from "next/link";
import { useDeleteArticle } from "@/modules/core/mutations/useDeleteArticle";
import { useUpdateArticlePublish } from "@/modules/core/mutations/useUpdateArticlePublish";

export type Article = {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<Article>[] = [
  {
    accessorKey: "title",
    header: "Titre",
  },
  {
    accessorKey: "published",
    header: "Publié",
    cell: ({ row }) => (row.original.published ? "Oui" : "Non"),
  },
  {
    accessorKey: "createdAt",
    header: "Date de création",
  },
  {
    accessorKey: "updatedAt",
    header: "Date de mise à jour",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const article = row.original;
      return <ActionCell article={article} />;
    },
  },
];

const ActionCell = ({ article }: { article: Article }) => {
  const deleteArticleMutation = useDeleteArticle();
  const updateArticlePublishMutation = useUpdateArticlePublish();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Ouvrir le menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href={`/blog/${article.slug}`}>Voir l&apos;article</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/admin/articles/${article.id}/comments`}>
            Voir les commentaires
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/admin/articles/update?id=${article.id}`}>
            Mettre à jour
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <DropdownMenuItem
            className={`${
              article.published
                ? "text-red-500 focus:bg-red-500 focus:text-white"
                : ""
            }`}
            onClick={() =>
              updateArticlePublishMutation.mutate({
                id: article.id,
                published: !article.published,
              })
            }
          >
            {article.published ? "Dépublier" : "Publier"}
          </DropdownMenuItem>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-500 focus:bg-red-500 focus:text-white"
          onClick={() => deleteArticleMutation.mutate(article.id)}
        >
          Supprimer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
