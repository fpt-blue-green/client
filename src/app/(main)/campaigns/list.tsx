'use client';

import CampaignCard from '@/components/campaign-card';
import Pagination from '@/components/custom/pagination';
import NoData from '@/components/no-data';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchRequest } from '@/request';
import { useLayoutEffect, useState } from 'react';

const PAGE_SIZE = 12;

const List = () => {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const { data, isLoading } = fetchRequest.campaign.available(page, PAGE_SIZE);

  useLayoutEffect(() => {
    if (!isLoading) {
      setPageCount(data ? Math.ceil(data.totalCount / PAGE_SIZE) : 0);
    }
  }, [data, isLoading]);

  return (
    <>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-8">
        {isLoading ? (
          Array.from({ length: PAGE_SIZE }).map((_, index) => <Skeleton key={index} className="h-40" />)
        ) : data && data.items.length > 0 ? (
          data.items.map((campaign) => <CampaignCard key={campaign.id} data={campaign} />)
        ) : (
          <NoData description="Không có chiến dịch" className="col-span-full" />
        )}
      </div>
      {pageCount > 1 && (
        <Pagination count={pageCount} page={page} boundaryCount={2} onPageChange={(value) => setPage(value)} />
      )}
    </>
  );
};

export default List;
