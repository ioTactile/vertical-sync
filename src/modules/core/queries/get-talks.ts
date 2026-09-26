import { talkGateway } from '@/modules/core/gateway-infra/api.talk-gateway';

const getTalks = async () => {
  return await talkGateway.getTalks();
};

export default getTalks;
