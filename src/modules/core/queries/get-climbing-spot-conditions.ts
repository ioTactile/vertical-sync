import { climbingSpotGateway } from '@/modules/core/gateway-infra/api.climbing-spot-gateway';

const getClimbingSpotConditions = async (climbingSpotId: string) => {
  return await climbingSpotGateway.getClimbingSpotConditions(climbingSpotId);
};

export default getClimbingSpotConditions;
