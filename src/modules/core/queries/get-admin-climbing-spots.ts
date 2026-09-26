import { climbingSpotGateway } from '@/modules/core/gateway-infra/api.climbing-spot-gateway';

const getAdminClimbingSpots = async () => {
  return await climbingSpotGateway.getAdminClimbingSpots();
};

export default getAdminClimbingSpots;
