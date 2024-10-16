'use client';

import CampaignCard from '@/components/campaign-card';
import NoData from '@/components/no-data';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchRequest } from '@/request';

const List = () => {
  const { data, isLoading } = fetchRequest.campaign.available();

  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-8">
      {isLoading ? (
        Array.from({ length: 12 }).map((_, index) => <Skeleton key={index} className="h-40" />)
      ) : data && data.length > 0 ? (
        data.map((campaign) => <CampaignCard key={campaign.id} data={campaign} />)
      ) : (
        <NoData description="Không có chiến dịch" className="col-span-full" />
      )}
    </div>
  );
};

export default List;
