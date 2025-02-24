import { climbingSpotGateway } from "@/modules/core/gateway-infra/api.climbing-spot-gateway";

const getClimbingSpotComments = async (id: string) => {
  return await climbingSpotGateway.getClimbingSpotComments(id);
};

export default getClimbingSpotComments;
