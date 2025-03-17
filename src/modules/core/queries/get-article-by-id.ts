import { articleGateway } from "@/modules/core/gateway-infra/api.article-gateway";

const getArticleById = async (id: string) => {
  return await articleGateway.getArticleById(id);
};

export default getArticleById;
