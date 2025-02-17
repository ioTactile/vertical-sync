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
import { useDeleteTalk } from "@/modules/core/mutations/useDeleteTalk";

export type Talk = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<Talk>[] = [
  {
    accessorKey: "title",
    header: "Titre",
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
