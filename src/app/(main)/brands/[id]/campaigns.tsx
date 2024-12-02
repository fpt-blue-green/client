'use client';
import CampaignCard from '@/components/campaign-card';
import NoData from '@/components/no-data';
import { fetchRequest } from '@/request';
import IBrand from '@/types/brand';

const Campaigns = ({ brand }: { brand: IBrand }) => {
  const { data: campaigns } = fetchRequest.campaign.listByBrand(brand.id);

  return (
    <div className="mb-10">
      <h2 className="mt-10 mb-4 text-xl font-semibold">Chiến dịch</h2>
      {campaigns && campaigns.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
