import { climbingSpotGateway } from "@/modules/core/gateway-infra/api.climbing-spot-gateway";

const getClimbingSpot = async (id: string) => {
  return await climbingSpotGateway.getClimbingSpot(id);
};

export default getClimbingSpot;
