"use client";

import { Button } from "@/app/_components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import ClimbingSpotForm from "@/modules/react/sections/spots/_components/climbing-spot-form";
import * as React from "react";

const ClimbingSpotsHeader = () => {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <div
        className="w-full h-16 rounded-xl bg-gradient-to-r from-primary via-accent to-secondary
        dark:from-primary/80 dark:via-accent/80 dark:to-secondary/80
        relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
      </div>

      <div className="flex justify-between items-center mt-2 px-2">
        <h1 className="text-2xl lg:text-3xl font-bold">
          Spots d&apos;escalade
        </h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="rounded-full">
              <Plus className="mr-2 h-4 w-4" />
              Créer un spot
            </Button>
          </DialogTrigger>
          <DialogContent className="overflow-y-auto max-h-full sm:max-h-[90dvh]">
            <DialogHeader>
              <DialogTitle>Créer un nouveau spot d&apos;escalade</DialogTitle>
            </DialogHeader>
            <ClimbingSpotForm onSuccess={handleCloseDialog} />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default ClimbingSpotsHeader;
