'use client';
import CampaignCard from '@/components/campaign-card';
import NoData from '@/components/no-data';
import { useAuthBrand } from '@/hooks';
import { fetcher } from '@/lib/http';
import ICampaign from '@/types/campaign';

import useSWRImmutable from 'swr/immutable';

const Campaigns = () => {
  const { profile } = useAuthBrand();
  const { data: campaigns } = useSWRImmutable<ICampaign[]>(`/Brands/${profile?.id}/campaigns`, fetcher);

  return (
    <div className="mb-10">
      <h2 className="mt-10 mb-4 text-xl font-semibold">Chiến dịch</h2>
      {campaigns && campaigns.length > 0 ? (
        <div className="grid grid-col-1 md:grid-cols-3 gap-4">
          {campaigns?.map((item) => (
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
