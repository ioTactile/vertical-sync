import { articleGateway } from "@/modules/core/gateway-infra/api.article-gateway";

const getAdminArticles = async () => {
  return await articleGateway.getAdminArticles();
};

export default getAdminArticles;
