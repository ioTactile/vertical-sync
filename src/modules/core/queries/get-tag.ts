import { tagGateway } from '@/modules/core/gateway-infra/api.tag-gateway';

const getTag = async (id: string) => {
  return await tagGateway.getTagById(id);
};

export default getTag;
