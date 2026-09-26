import { articleGateway } from '@/modules/core/gateway-infra/api.article-gateway';

const getArticleBySlugWithRelations = async (slug: string) => {
  return await articleGateway.getArticleBySlugWithRelations(slug);
};

export default getArticleBySlugWithRelations;
