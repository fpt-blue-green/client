'use client';

import CampaignCard from '@/components/campaign-card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuthInfluencer } from '@/hooks';
import { fetchRequest } from '@/request';

interface CampaignListProps {
  title: string;
  url?: string;
  subtitle?: string;
  className?: string;
}

const Recommendation = ({ title, subtitle, className }: CampaignListProps) => {
  const { profile } = useAuthInfluencer();
  const { data, isLoading } = fetchRequest.campaign.recommendation(!!profile);

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
              <CarouselItem key={index} className="lg:basis-1/3 md:basis-1/2 basis-2/3">
                <Skeleton className="h-40" />
              </CarouselItem>
            ))
          : data &&
            data.map((c) => (
              <CarouselItem key={c.id} className="lg:basis-1/3 md:basis-1/2 basis-2/3">
                <CampaignCard data={c} />
              </CarouselItem>
            ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Recommendation;
