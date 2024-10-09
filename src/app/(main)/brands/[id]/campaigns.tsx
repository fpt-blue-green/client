'use client';
import { fetcher } from '@/lib/http';
import ICampaign from '@/types/campaign';
import Image from 'next/image';
import Link from 'next/link';
import useSWRImmutable from 'swr/immutable';

const Campaigns = () => {
  const { data: campaigns } = useSWRImmutable<ICampaign[]>('/Brand/campaigns', fetcher);
  return (
    <div className="mb-10">
      <h2 className="mt-10 mb-4 text-xl font-semibold">Chiến dịch của bạn</h2>
      {campaigns && campaigns.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {campaigns.map((item, index) => (
            <div key={index} className="w-full relative">
              <Link href={''} target="_blank">
                <Image
                  className="w-full object-cover rounded-sm ease-out duration-300"
                  src={
                    item.images[0]?.url ||
                    'https://d5ik1gor6xydq.cloudfront.net/websiteImages/creatorMarketplace/noPic.png'
                  }
                  alt={item.name}
                  width={400}
                  height={200}
                />
                <p className="absolute bottom-2 left-2 text-primary-foreground">{item.title || ''}</p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm font-light">Bạn chưa có chiến dịch nào.</p>
      )}
    </div>
  );
};

export default Campaigns;
