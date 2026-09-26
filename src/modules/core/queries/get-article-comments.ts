import { articleGateway } from '@/modules/core/gateway-infra/api.article-gateway';

const getArticleComments = async (id: string) => {
  return await articleGateway.getArticleComments(id);
};

export default getArticleComments;
