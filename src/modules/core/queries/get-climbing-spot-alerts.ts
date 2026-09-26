import { climbingSpotGateway } from '@/modules/core/gateway-infra/api.climbing-spot-gateway';

const getClimbingSpotAlerts = async (userId: string) => {
  return await climbingSpotGateway.getClimbingSpotAlerts(userId);
};

export default getClimbingSpotAlerts;
