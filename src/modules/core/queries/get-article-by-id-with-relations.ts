import { articleGateway } from "@/modules/core/gateway-infra/api.article-gateway";

const getArticleByIdWithRelations = async (id: string) => {
  return await articleGateway.getArticleByIdWithRelations(id);
};

export default getArticleByIdWithRelations;
