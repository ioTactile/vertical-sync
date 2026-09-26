import { articleGateway } from '@/modules/core/gateway-infra/api.article-gateway';

const getPublicArticles = async (userId: string | undefined, page?: number) => {
  return await articleGateway.getPublicArticles({
    userId,
    page,
  });
};

export default getPublicArticles;
