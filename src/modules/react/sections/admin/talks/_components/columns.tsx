import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
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
import { useDeleteTalk } from "@/modules/core/mutations/useDeleteTalk";

export type Talk = {
  id: string;
  title: string;
  _count: {
    talkComments: number;
  };
  updatedAt: string;
};

export const columns: ColumnDef<Talk>[] = [
  {
    accessorKey: "title",
    header: "Titre",
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      return (
        <div title={title}>
          {title.slice(0, 20)}
          {title.length > 20 && "..."}
        </div>
      );
    },
  },
  {
    accessorKey: "talkComments",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Commentaires
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const comments = row.original._count.talkComments;
      return <div>{comments}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date de mise à jour
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const talk = row.original;
      return <ActionCell talk={talk} />;
    },
  },
];

const ActionCell = ({ talk }: { talk: Talk }) => {
  const deleteTalkMutation = useDeleteTalk();

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
          <Link href={`/talks/${talk.id}/${talk.title}`}>
            Voir la discussion
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/admin/talks/update?id=${talk.id}`}>Mettre à jour</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-500 focus:bg-red-500 focus:text-white"
          onClick={() => deleteTalkMutation.mutate(talk.id)}
        >
          Supprimer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
