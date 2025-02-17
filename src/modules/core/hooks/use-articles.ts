import getArticles from "@/modules/core/queries/get-articles";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

const useArticles = (userId?: string, page: number = 1) => {
  return useQuery({
    queryKey: ["articles", { page }],
    queryFn: () => getArticles(userId, page),
    placeholderData: keepPreviousData,
  });
};

export default useArticles;
