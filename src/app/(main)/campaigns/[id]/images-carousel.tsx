'use client';

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import ICampaign from '@/types/campaign';
import Image from 'next/image';
import { FC, useState } from 'react';

interface ImagesCarouselProps {
  campaign: ICampaign;
}

const ImagesCarousel: FC<ImagesCarouselProps> = ({ campaign }) => {
  const [current, setCurrent] = useState(0);

  const handleSlidesChange = (api: CarouselApi) => {
    setCurrent(api?.selectedScrollSnap() || 0);
  };

  return (
    <div className="relative max-md:-mx-6 max-md:-mt-8">
      <Carousel opts={{ align: 'start' }} onSlidesChange={handleSlidesChange} className="md:rounded-lg overflow-hidden">
        <CarouselContent>
          {campaign.images.map((img, index) => (
            <CarouselItem key={index} className="lg:basis-1/3 md:basis-1/2 max-md:pl-0">
              <Image
                src={img.url || ''}
                alt={`Ảnh bìa của chiến dịch ${campaign.title}`}
                width={800}
                height={800}
                className="w-full md:aspect-thumbnail aspect-square object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute md:hidden bottom-3 right-3 bg-black/60 text-white text-sm rounded-md py-1 px-2 tracking-wider">{`${
        current + 1
      }/${campaign.images.length}`}</div>
    </div>
  );
};
export default ImagesCarousel;
