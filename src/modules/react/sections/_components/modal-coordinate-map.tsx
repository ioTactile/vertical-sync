import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/_components/ui/dialog";
import { MapPin } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import { DEFAULT_LOCATION } from "@/app/_constants/app";
import { Skeleton } from "@/app/_components/ui/skeleton";
import dynamic from "next/dynamic";

interface ModalCoordinateMapProps {
  isMapOpen: boolean;
  setIsMapOpen: (isMapOpen: boolean) => void;
  selectedCoordinates: [number, number] | null;
  handleCoordinateSelection: (coords: [number, number]) => void;
}

// Chargement dynamique de la carte pour éviter les erreurs de rendu côté serveur
const CoordinateMap = dynamic(
  () => import("@/modules/react/sections/_components/coordinate-map"),
  {
    ssr: false,
    loading: () => <Skeleton className="h-100 w-full" />,
  },
);

export const ModalCoordinateMap = ({
  isMapOpen,
  setIsMapOpen,
  selectedCoordinates,
  handleCoordinateSelection,
}: ModalCoordinateMapProps) => {
  return (
    <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="col-span-full flex items-center gap-2 justify-center"
        >
          <MapPin size={16} />
          Utiliser la carte
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-200 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Sélectionner les coordonnées sur la carte</DialogTitle>
        </DialogHeader>
        <CoordinateMap
          initialCoords={selectedCoordinates || DEFAULT_LOCATION}
          onSelectCoords={handleCoordinateSelection}
        />
        <DialogFooter className="mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsMapOpen(false)}
          >
            Annuler
          </Button>
          <Button
            type="button"
            onClick={() => {
              if (selectedCoordinates) {
                handleCoordinateSelection(selectedCoordinates);
              }
            }}
          >
            Valider
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
