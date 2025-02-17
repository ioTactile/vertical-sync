import getArticles from "@/modules/core/queries/get-articles";
import { useQuery } from "@tanstack/react-query";

const useArticles = (userId?: string) => {
  return useQuery({
    queryKey: ["articles"],
    queryFn: () => getArticles(userId),
  });
};

export default useArticles;
