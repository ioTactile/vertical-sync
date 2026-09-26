import { articleGateway } from '@/modules/core/gateway-infra/api.article-gateway';

const getArticleBySlug = async (slug: string) => {
  return await articleGateway.getArticleBySlug(slug);
};

export default getArticleBySlug;
