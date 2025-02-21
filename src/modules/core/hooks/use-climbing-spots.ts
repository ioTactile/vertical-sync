import { useQuery } from "@tanstack/react-query";
import getClimbingSpots from "@/modules/core/queries/get-climbing-spots";

const useClimbingSpots = () => {
  return useQuery({
    queryKey: ["climbing-spots"],
    queryFn: () => getClimbingSpots(),
  });
};

export default useClimbingSpots;
