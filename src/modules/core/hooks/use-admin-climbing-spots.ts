import { useQuery } from "@tanstack/react-query";
import getAdminClimbingSpots from "@/modules/core/queries/get-admin-climbing-spots";

const useAdminClimbingSpots = () => {
  return useQuery({
    queryKey: ["admin-climbing-spots"],
    queryFn: () => getAdminClimbingSpots(),
  });
};

export default useAdminClimbingSpots;
