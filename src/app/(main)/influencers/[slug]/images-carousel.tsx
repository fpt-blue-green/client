'use client';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import IInfluencer from '@/types/influencer';
import Image from 'next/image';
import { FC, useState } from 'react';

interface ImagesCarouselProps {
  influencer: IInfluencer;
}

const ImagesCarousel: FC<ImagesCarouselProps> = ({ influencer }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [thumbApi, setThumbApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const handleClickThumb = (index: number) => () => {
    api?.scrollTo(index);
    thumbApi?.scrollTo(index);
  };

  const handleSlidesChange = (api: CarouselApi) => {
    const index = api?.selectedScrollSnap() || 0;
    setCurrent(index);
    thumbApi?.scrollTo(index);
  };

  return (
    <div className="flex flex-col gap-4 h-full max-md:-mt-8">
      <Carousel className="relative max-md:-mx-5" setApi={setApi} onSlidesChange={handleSlidesChange}>
        <CarouselContent>
          {influencer.images.map((img, index) => (
            <CarouselItem key={index}>
              <Image
                src={img.url}
                alt={`Ảnh bìa trang của nhân của ${influencer.fullName}`}
                width={800}
                height={800}
                className="w-full aspect-square object-cover md:rounded-lg"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 opacity-50 disabled:hidden max-md:hidden" />
        <CarouselNext className="right-2 opacity-50 disabled:hidden max-md:hidden" />
        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-sm rounded-md py-1 px-2 tracking-wider">{`${
          current + 1
        }/${influencer.images.length}`}</div>
      </Carousel>
      <Carousel opts={{ loop: true }} setApi={setThumbApi}>
        <CarouselContent>
          {influencer.images.map((img, index) => (
            <CarouselItem key={index} className="basis-1/3" onClick={handleClickThumb(index)}>
              <Image
                src={img.url}
                alt={`Ảnh bìa trang của nhân của ${influencer.fullName}`}
                width={800}
                height={800}
                className={cn('w-full aspect-square object-cover rounded-lg transition-opacity opacity-50', {
                  'opacity-100 border-2 border-foreground': index === current,
                })}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ImagesCarousel;
