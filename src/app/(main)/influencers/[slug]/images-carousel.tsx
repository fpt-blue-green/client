'use client';

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import IInfluencer from '@/types/influencer';
import Image from 'next/image';
import { FC, useState } from 'react';

interface ImagesCarouselProps {
  influencer: IInfluencer;
}

const ImagesCarousel: FC<ImagesCarouselProps> = ({ influencer }) => {
  const [imgIndex, setImgIndex] = useState(0);

  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      onSlidesChange={(api) => setImgIndex(api?.selectedScrollSnap() || 0)}
      className="relative max-md:-mx-6 max-md:-mt-8 md:rounded-lg overflow-hidden"
    >
      <CarouselContent>
        {influencer.images.map((img, index) => (
          <CarouselItem key={index} className="lg:basis-1/3 md:basis-1/2 max-md:pl-0">
            <Image
              src={img.url || ''}
              alt={`Ảnh bìa trang của nhân của ${influencer.fullName}`}
              width={800}
              height={800}
              className="w-full md:aspect-thumbnail aspect-square object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute bottom-3 right-3 bg-black/60 text-white text-sm rounded-md py-1 px-2 tracking-wider md:hidden">{`${
        imgIndex + 1
      }/${influencer.images.length}`}</div>
    </Carousel>
  );
};
export default ImagesCarousel;
