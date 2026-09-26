import { talkGateway } from '@/modules/core/gateway-infra/api.talk-gateway';

const getTalk = async (id: string) => {
  return await talkGateway.getTalk(id);
};

export default getTalk;
