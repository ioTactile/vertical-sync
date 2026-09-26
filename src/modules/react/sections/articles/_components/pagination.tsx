'use client';

import { Button } from '@/app/_components/ui/button';
import { usePaginationStore } from '@/modules/core/store/store';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { useCallback, useEffect, useMemo } from 'react';
import useArticles from '@/modules/core/hooks/use-public-articles-page';
import PaginationSkeleton from '@/modules/react/sections/articles/_components/pagination-skeleton';
import { useUserStore } from '@/modules/core/store/store';

const Pagination = () => {
  const { user } = useUserStore();
  const { page } = usePaginationStore();
  const { data, isPending } = useArticles(user?.id, page);

  const totalPages = useMemo(() => Math.ceil((data?.total || 0) / 10), [data?.total]);

  const disabledNextPage = useMemo(() => page >= totalPages, [page, totalPages]);
  const disabledPreviousPage = useMemo(() => page <= 1, [page]);

  const [urlPage, setUrlPage] = useQueryState('page', {
    parse: (value) => parseInt(value),
    serialize: (value) => value.toString(),
    scroll: true,
  });

  const { page: storePage, setPage: setStorePage } = usePaginationStore();

  useEffect(() => {
    if (urlPage !== storePage) {
      setStorePage(urlPage || 1);
    }
  }, [urlPage, storePage, setStorePage]);

  const handlePreviousPage = useCallback(() => {
    setStorePage(storePage - 1);
    setUrlPage(storePage - 1);
  }, [storePage, setStorePage, setUrlPage]);

  const handleNextPage = useCallback(() => {
    setStorePage(storePage + 1);
    setUrlPage(storePage + 1);
  }, [storePage, setStorePage, setUrlPage]);

  if (isPending) {
    return <PaginationSkeleton />;
  }

  if (!data?.articles.length) return null;

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handlePreviousPage}
        disabled={disabledPreviousPage}
      >
        <ChevronLeft className="h-4 w-4" />
        Précédent
      </Button>

      <span className="text-sm">Page {storePage}</span>

      <Button variant="outline" size="sm" onClick={handleNextPage} disabled={disabledNextPage}>
        Suivant
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
