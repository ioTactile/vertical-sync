import { useQuery } from "@tanstack/react-query";
import getPublicClimbingSpots from "@/modules/core/queries/get-public-climbing-spots";

const usePublicClimbingSpots = () => {
  return useQuery({
    queryKey: ["climbing-spots"],
    queryFn: () => getPublicClimbingSpots(),
  });
};

export default usePublicClimbingSpots;
