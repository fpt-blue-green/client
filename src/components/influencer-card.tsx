'use client';

import { FC, MouseEvent } from 'react';
import config from '@/config';
import { constants, formats } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Skeleton } from './ui/skeleton';
import { HeartFilledIcon, HeartIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import IInfluencer from '@/types/influencer';
import { PlatformData } from '@/types/enum';
import { brandRequest, fetchRequest } from '@/request';
import { toast } from 'sonner';
import { useAuthBrand, useThrottle } from '@/hooks';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Rating from './custom/rating';

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
}

const InfluencerCard: FC<InfluencerCardProps> = ({ data = mockInfluencer }) => {
  const { profile } = useAuthBrand();
  const { data: favorites, mutate } = fetchRequest.favorites(!!profile);
  const isFavorite = Boolean(favorites && favorites.some((f) => f.id === data.id));

  const handleFavorite = useThrottle((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const caller = isFavorite ? brandRequest.unfavorite(data.id) : brandRequest.favorite(data.id);
    toast.promise(caller, {
      loading: 'Đang tải',
      success: () => {
        mutate();
        return (isFavorite ? 'Đã xóa khỏi' : 'Đã thêm vào') + ' danh sách yêu thích';
      },
      error: (err) => err?.message || constants.sthWentWrong,
    });
  }, 750);

  return (
    <div className="relative bg-popover shadow-md rounded-lg overflow-hidden">
      {profile && (
        <div className="absolute top-3 right-3 z-10">
          <Button variant="secondary" className="h-7 p-1 rounded-full" onClick={handleFavorite}>
            {isFavorite ? <HeartFilledIcon className="size-5 text-destructive" /> : <HeartIcon className="size-5" />}
          </Button>
        </div>
      )}
      <Link href={config.routes.influencers.details(data.slug)} className="text-sm">
        {/* <div className="relative rounded-lg overflow-hidden group">
          <div className="flex items-center transition-transform duration-300 group-hover:-translate-x-full">
            <Image
              src={data.images[0]?.url}
              alt={`Ảnh đại diện của ${data.fullName}`}
              width={400}
              height={600}
              className="aspect-thumbnail object-cover w-full"
            />
            <Image
              src={data.images[1]?.url || data.images[0]?.url}
              alt={`Ảnh đại diện của ${data.fullName}`}
              width={400}
              height={600}
              className="aspect-thumbnail object-cover w-full"
            />
          </div>
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
              const { name, logo } = PlatformData[c.platform];
              return <Image key={index} src={logo} alt={name} width={50} height={50} className="size-5" />;
            })}
          </div>
          <span className="font-bold">{formats.price(data.averagePrice)}</span>
        </div>
        <div className="text-xs">{data.summarise}</div> */}
        <div className="relative group">
          <div className="flex items-center transition-transform duration-300 group-hover:-translate-x-full">
            <Image
              src={data.images[0]?.url}
              alt={`Ảnh đại diện của ${data.fullName}`}
              width={500}
              height={500}
              className="aspect-square object-cover w-full"
            />
            <Image
              src={data.images[1]?.url || data.images[0]?.url}
              alt={`Ảnh đại diện của ${data.fullName}`}
              width={500}
              height={500}
              className="aspect-square object-cover w-full"
            />
          </div>
          <div className="absolute left-0 top-0 right-0 bottom-0 bg-bg-gradient-to-b from-black/10 from-70% to-black"></div>
          <div className="absolute p-1 bg-white border border-dashed border-muted bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full">
            <Avatar>
              <AvatarImage src={data.avatar} alt={`Ảnh đại diện của ${data.fullName}`} />
              <AvatarFallback>{data.fullName[0]}</AvatarFallback>
            </Avatar>
          </div>
          <h5 className="absolute bottom-8 left-1/2 -translate-x-1/2 font-semibold text-white flex flex-col items-center">
            {data.fullName}
            <Rating defaultValue={data.rateAverage} precision={0.25} readOnly size={16} />
          </h5>
        </div>
        <div className="p-4 mt-6">
          <div className="flex justify-center items-center gap-4">
            {data.channels.map((c) => {
              const { name, logo, followerText } = PlatformData[c.platform];
              return (
                <div key={c.id} className="flex flex-col items-center gap-1">
                  <Image src={logo} alt={name} width={30} height={30} />
                  <span className="font-semibold text-base">{formats.estimate(c.followersCount)}</span>
                  <span className="text-xs text-muted-foreground">{followerText.substring(6)}</span>
                </div>
              );
            })}
          </div>
          <div className="text-center text-lg font-bold mt-2">{formats.price(data.averagePrice)}</div>
        </div>
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
