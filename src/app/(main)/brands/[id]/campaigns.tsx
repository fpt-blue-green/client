'use client';
import config from '@/config';
import { fetcher } from '@/lib/http';
import { cn, formats } from '@/lib/utils';
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
        <div className="grid md:grid-cols-2 grid-cols-2 gap-4">
          {campaigns.map((item) => {
            const firstImage = item.images[0];

            return (
              <div
                key={item.id}
                className={cn('relative bg-accent rounded-lg overflow-hidden select-none', {
                  'pb-[100%]': !firstImage,
                })}
              >
                {firstImage && (
                  <Image
                    src={firstImage.url}
                    alt={`Ảnh về chiến dịch ${item.title}`}
                    width={500}
                    height={500}
                    className="object-cover w-full aspect-video transition-transform hover:scale-110"
                  />
                )}
                <div className="absolute left-0 top-0 right-0 bottom-0 bg-bg-gradient-to-b from-black/5 from-75% to-black pointer-events-none"></div>
                <div className="absolute left-4 bottom-4 text-white">
                  <Link href={config.routes.campaigns.details(item.id)} className="font-semibold hover:underline">
                    {item.name}
                  </Link>
                  <div className="text-sm">
                    {formats.date(item.startDate)} - {formats.date(item.endDate)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm font-light">Bạn chưa có chiến dịch nào.</p>
      )}
    </div>
  );
};

export default Campaigns;
