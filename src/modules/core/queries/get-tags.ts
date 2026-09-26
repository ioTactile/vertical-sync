import { tagGateway } from '@/modules/core/gateway-infra/api.tag-gateway';

const getTags = async () => {
  return await tagGateway.getTags();
};

export default getTags;
