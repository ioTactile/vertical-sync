import { useQuery } from "@tanstack/react-query";
import getClimbingSpotsByRadiusAndCoords from "@/modules/core/queries/get-climbing-spots-by-radius-and-coors";

const useClimbingSpotsByRadiusAndCoords = (
  radius: number,
  coords: {
    latitude: number;
    longitude: number;
  },
  { enabled }: { enabled: boolean }
) => {
  return useQuery({
    queryKey: ["climbing-spots"],
    queryFn: () => getClimbingSpotsByRadiusAndCoords(radius, coords),
    enabled,
  });
};

export default useClimbingSpotsByRadiusAndCoords;
