import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/app/_components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/_components/ui/dropdown-menu';
import Link from 'next/link';
import { useDeleteArticle } from '@/modules/core/mutations/useDeleteArticle';
import { useUpdateArticlePublish } from '@/modules/core/mutations/useUpdateArticlePublish';
import { DataTableFeatures } from '@/modules/react/sections/_components/data-table';

export type Article = {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  updatedAt: string;
};

export const columns: ColumnDef<DataTableFeatures, Article>[] = [
  {
    accessorKey: 'title',
    header: 'Titre',
    cell: ({ row }) => {
      const title = row.getValue('title') as string;
      return (
        <div title={title}>
          {title.slice(0, 20)}
          {title.length > 20 && '...'}
        </div>
      );
    },
  },
  {
    accessorKey: 'published',
    header: 'Publié',
    cell: ({ row }) => (row.original.published ? 'Oui' : 'Non'),
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Date de mise à jour
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
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
          <Link href={`/admin/articles/${article.id}/comments`}>Voir les commentaires</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/admin/articles/update?id=${article.id}`}>Mettre à jour</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <DropdownMenuItem
            className={`${
              article.published ? 'text-red-500 focus:bg-red-500 focus:text-white' : ''
            }`}
            onClick={() =>
              updateArticlePublishMutation.mutate({
                id: article.id,
                published: !article.published,
              })
            }
          >
            {article.published ? 'Dépublier' : 'Publier'}
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
