'use client';

import { FC, MouseEvent } from 'react';
import config from '@/config';
import { constants, formats } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Skeleton } from './ui/skeleton';
import { HeartFilledIcon, HeartIcon, StarFilledIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import IInfluencer from '@/types/influencer';
import { PlatformData } from '@/types/enum';
import { brandRequest, fetchRequest } from '@/request';
import { toast } from 'sonner';
import { useThrottle } from '@/hooks';

const mockInfluencer: IInfluencer = {
  id: 'fakeId',
  address: 'Đà Nẵng, Việt Nam',
  avatar: '/assets/img/influencer.jpg',
  averagePrice: 480000,
  channels: [
    {
      id: 'fakeId',
      followersCount: 400,
      platform: 1,
      userName: 'string',
    },
  ],
  fullName: 'Fake Influencer',
  gender: 1,
  images: [{ id: 'fakeId', url: '/assets/img/influencer.jpg' }],
  isPublish: true,
  nickName: 'fakeId',
  packages: [],
  phone: '',
  rateAverage: 3,
  slug: 'string',
  summarise: 'Thời trang và phong cách sống',
  userId: '',
  tags: [],
};

interface InfluencerCardProps {
  data?: IInfluencer;
  favorite?: boolean;
}

const InfluencerCard: FC<InfluencerCardProps> = ({ data = mockInfluencer, favorite }) => {
  const { data: favorites, mutate } = fetchRequest.favorites();
  const isFavorite = favorites?.some((f) => f.id === data.id);

  const handleFavorite = useThrottle((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const caller = isFavorite ? brandRequest.unfavorite(data.id) : brandRequest.favorite(data.id);
    caller
      .then(() => {
        mutate().then(() => toast.success((isFavorite ? 'Đã xóa khỏi' : 'Đã thêm vào') + ' danh sách yêu thích'));
      })
      .catch((err) => toast.error(err?.message || constants.sthWentWrong));
  }, 750);

  return (
    <div className="relative">
      {favorite !== undefined && (
        <div className="absolute top-3 right-3 z-10">
          <Button variant="secondary" className="h-7 p-1 rounded-full" onClick={handleFavorite}>
            {isFavorite ? <HeartFilledIcon className="size-5 text-destructive" /> : <HeartIcon className="size-5" />}
          </Button>
        </div>
      )}
      <Link href={config.routes.influencers.details(data.slug)} className="space-y-1.5 text-sm">
        <div className="relative rounded-lg overflow-hidden group">
          <Image
            src={data.images[0]?.url}
            alt={`Ảnh đại diện của ${data.fullName}`}
            width={400}
            height={600}
            className="aspect-thumbnail object-cover transition-transform w-full group-hover:scale-110"
          />
          <div className="absolute left-0 top-0 right-0 bottom-0 bg-bg-gradient-to-b from-black/5 from-75% to-black"></div>
          <div className="absolute left-3 bottom-2 text-white">
            <div className="flex items-center gap-1">
              <h6 className="font-semibold text-sm">{data.fullName}</h6>
              {data.rateAverage > 0 && (
                <>
                  <StarFilledIcon className="text-yellow-400" />
                  <span>{data.rateAverage.toFixed(1)}</span>
                </>
              )}
            </div>
            <span className="text-xs">{data.address}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm">
            {data.channels.map((c, index) => {
              const { Icon } = PlatformData[c.platform];
              return <Icon key={index} />;
            })}
          </div>
          <span className="font-bold">{formats.price(data.averagePrice)}</span>
        </div>
        <div className="text-xs">{data.summarise}</div>
      </Link>
    </div>
  );
};

export const InfluencerCardSkeleton = () => {
  return (
    <div className="space-y-1.5">
      <div className="relative pb-[133.33333%]">
        <Skeleton className="absolute inset-0" />
      </div>
      <div className="flex justify-between">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/3" />
      </div>
      <Skeleton className="h-4 w-full" />
    </div>
  );
};

export default InfluencerCard;
