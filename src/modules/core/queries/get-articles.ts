import { articleGateway } from "@/modules/core/gateway-infra/api.article-gateway";

const getArticles = async (userId: string | undefined, page?: number) => {
  return await articleGateway.getArticles(userId, page);
};

export default getArticles;
