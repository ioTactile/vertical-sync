import { climbingSpotGateway } from "@/modules/core/gateway-infra/api.climbing-spot-gateway";

const getClimbingSpotsSearch = async (searchQuery: string) => {
  return await climbingSpotGateway.getClimbingSpotsSearch(searchQuery);
};

export default getClimbingSpotsSearch;
