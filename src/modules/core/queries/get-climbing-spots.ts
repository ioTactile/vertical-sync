import { climbingSpotGateway } from "@/modules/core/gateway-infra/api.climbing-spot-gateway";

const getClimbingSpots = async () => {
  return await climbingSpotGateway.getClimbingSpots();
};

export default getClimbingSpots;
