"use client";

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
import { useShare } from "@/app/_hooks/use-share";
import { useDeleteTag } from "@/modules/core/mutations/useDeleteTag";

export type Tag = {
  id: string;
  name: string;
  updatedAt: string;
};

export const columns: ColumnDef<Tag>[] = [
  {
    accessorKey: "name",
    header: "Nom",
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      return (
        <div title={name}>
          {name.slice(0, 20)}
          {name.length > 20 && "..."}
        </div>
      );
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
      const tag = row.original;

      return <ActionCell tag={tag} />;
    },
  },
];

const ActionCell = ({ tag }: { tag: Tag }) => {
  const { handleShare } = useShare();
  const deleteTagMutation = useDeleteTag();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{tag.name}</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() =>
            handleShare(tag.name, "Le tag a été copié dans le presse-papiers")
          }
        >
          Copier le tag
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/admin/tags/update?id=${tag.id}`}>Mettre à jour</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-500 focus:bg-red-500 focus:text-white"
          onClick={() => deleteTagMutation.mutate(tag.id)}
        >
          Supprimer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
