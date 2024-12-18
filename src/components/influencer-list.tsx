'use client';

import { FC } from 'react';
import InfluencerCard, { InfluencerCardSkeleton } from './influencer-card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@/lib/http';
import IInfluencer from '@/types/influencer';

interface InfluencerListProps {
  title: string;
  url?: string;
  subtitle?: string;
  className?: string;
}

const InfluencerList: FC<InfluencerListProps> = ({ title, url, subtitle, className }) => {
  const { data, isLoading } = useSWRImmutable<IInfluencer[]>(url, fetcher);

  return (
    <Carousel opts={{ align: 'start', dragFree: true }} className={className}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-semibold">{title}</h3>
          <h4 className="mt-1 text-sm">{subtitle}</h4>
        </div>
        <div className="flex gap-3 max-md:hidden">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
      </div>
      <CarouselContent className="pb-2">
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem key={index} className="lg:basis-1/4 md:basis-1/3 sm:basis-1/2 basis-2/3">
                <InfluencerCardSkeleton />
              </CarouselItem>
            ))
          : data
          ? data.map((i) => (
              <CarouselItem key={i.id} className="lg:basis-1/4 md:basis-1/3 sm:basis-1/2 basis-2/3">
                <InfluencerCard data={i} />
              </CarouselItem>
            ))
          : Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem key={index} className="lg:basis-1/4 md:basis-1/3 sm:basis-1/2 basis-2/3">
                <InfluencerCard />
              </CarouselItem>
            ))}
      </CarouselContent>
    </Carousel>
  );
};

export default InfluencerList;
