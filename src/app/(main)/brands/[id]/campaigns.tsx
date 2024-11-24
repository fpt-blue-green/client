'use client';
import CampaignCard from '@/components/campaign-card';
import NoData from '@/components/no-data';
import { fetcher } from '@/lib/http';
import ICampaign from '@/types/campaign';
import { IFilterList } from '@/types/filter-list';

import useSWRImmutable from 'swr/immutable';

const Campaigns = () => {
  const { data: campaigns } = useSWRImmutable<IFilterList<ICampaign>>('/Brand/campaigns', fetcher);

  return (
    <div className="mb-10">
      <h2 className="mt-10 mb-4 text-xl font-semibold">Chiến dịch</h2>
      {campaigns && campaigns.items.length > 0 ? (
        <div className="grid grid-col1 md:grid-cols-2 gap-4">
          {campaigns.items?.map((item) => (
            <CampaignCard key={item.id} data={item} />
          ))}
        </div>
      ) : (
        <NoData description="Không có chiến dịch" className="col-span-full" />
      )}
    </div>
  );
};

export default Campaigns;
