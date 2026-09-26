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
import {
  CLIMBING_SPOT_DIFFICULTY_LABELS,
  CLIMBING_SPOT_STATUS_LABELS,
  CLIMBING_SPOT_TYPE_LABELS,
} from "@/types/enum";
import { useDeleteClimbingSpot } from "@/modules/core/mutations/useDeleteClimbingSpot";
import { ClimbingSpotStatus } from "@/modules/core/domain/enums";
import { DataTableFeatures } from "@/modules/react/sections/_components/data-table";

export type Spot = {
  id: string;
  name: string;
  updatedAt: string;
  types: string[];
  difficulties: string[];
  notation: string;
  status: string;
};

export const columns: ColumnDef<DataTableFeatures, Spot>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nom
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
    accessorKey: "types",
    header: "Types",
    cell: ({ row }) => {
      const types = row.getValue("types") as string[];
      return (
        <div>
          {types
            .map(
              (type) =>
                CLIMBING_SPOT_TYPE_LABELS[
                  type as keyof typeof CLIMBING_SPOT_TYPE_LABELS
                ]
            )
            .join(", ")}
        </div>
      );
    },
  },
  {
    accessorKey: "difficulties",
    header: "Difficultés",
    cell: ({ row }) => {
      const difficulties = row.getValue("difficulties") as string[];
      return (
        <div>
          {difficulties
            .map(
              (diff) =>
                CLIMBING_SPOT_DIFFICULTY_LABELS[
                  diff as keyof typeof CLIMBING_SPOT_DIFFICULTY_LABELS
                ]
            )
            .join(", ")}
        </div>
      );
    },
  },
  {
    accessorKey: "notation",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Note
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => {
      const status = row.getValue("status") as ClimbingSpotStatus;
      return <div>{CLIMBING_SPOT_STATUS_LABELS[status]}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Date de mise à jour",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const spot = row.original;

      return <ActionCell spot={spot} />;
    },
  },
];

const ActionCell = ({ spot }: { spot: Spot }) => {
  const deleteSpotMutation = useDeleteClimbingSpot();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href={`/admin/spots/${spot.id}`}>Voir le spot</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/admin/spots/update?id=${spot.id}`}>Mettre à jour</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-500 focus:bg-red-500 focus:text-white"
          onClick={() => deleteSpotMutation.mutate(spot.id)}
        >
          Supprimer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
