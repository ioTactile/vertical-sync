import { talkGateway } from '@/modules/core/gateway-infra/api.talk-gateway';

const getTalkWithComments = async (id: string) => {
  return await talkGateway.getTalkWithComments(id);
};

export default getTalkWithComments;
