import { FC } from 'react';
import Packages from './packages';
import InfluencerList from '@/components/influencer-list';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { estimateFollowers } from '@/lib/utils';
import { LuHeart, LuShare } from 'react-icons/lu';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { PlatformData } from '@/types/enum';
import Tooltip from '@/components/custom/tooltip';
import { influencersRequest } from '@/request';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import IInfluencer from '@/types/influencer';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import config from '@/config';
import { RiPencilLine } from 'react-icons/ri';

const getInfluencer = async (slug: string): Promise<IInfluencer> => {
  try {
    const res = await influencersRequest.getInfluencerBySlug(slug);
    if (!res.data) {
      return notFound();
    }
    return res.data;
  } catch {
    return notFound();
  }
};

interface InfluencerDetailsProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: InfluencerDetailsProps): Promise<Metadata> {
  const influencer = await getInfluencer(params.slug);
  return {
    title: influencer.fullName,
  };
}

const InfluencerDetails: FC<InfluencerDetailsProps> = async ({ params }) => {
  const [influencer, session] = await Promise.all([getInfluencer(params.slug), getServerSession(authOptions)]);

  return (
    <div className="container mt-8 mb-16">
      <div>
        <div className="hidden md:flex space-x-1 justify-end mb-4">
          <Button variant="ghost" startIcon={<LuShare />}>
            Chia Sẻ
          </Button>
          {session?.user.id === influencer.userId ? (
            <Button variant="ghost" startIcon={<RiPencilLine />} asChild>
              <Link href={config.routes.influencers.editProfile}>Chỉnh sửa</Link>
            </Button>
          ) : (
            <Button variant="ghost" startIcon={<LuHeart />}>
              Yêu thích
            </Button>
          )}
        </div>
        <Carousel opts={{ align: 'start' }} className="max-md:-mx-6 max-md:-mt-8 md:rounded-lg overflow-hidden">
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
        </Carousel>
        <div className="mt-5">
          <div className="flex flex-row-reverse md:flex-row gap-4">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="size-12 sm:size-16 md:size-20">
                <AvatarImage width={200} src={influencer.avatar} alt="Avatar" />
                <AvatarFallback>{influencer.fullName[0]}</AvatarFallback>
              </Avatar>
              <div className="md:hidden flex gap-1">
                <Tooltip label="Yêu thích">
                  <Button variant="ghost" size="icon">
                    <LuHeart size="16" />
                  </Button>
                </Tooltip>
                <Tooltip label="Chia sẻ">
                  <Button variant="ghost" size="icon">
                    <LuShare size="16" />
                  </Button>
                </Tooltip>
              </div>
            </div>
            <div className="sm:pl-4 md:pl-0 flex-1">
              <h5 className="font-semibold text-xl md:text-2xl">
                {influencer.fullName} | {influencer.summarise}
              </h5>
              <p className="mb-2 mt-1 text-muted-foreground text-sm">{influencer.address}</p>
              <div className="flex flex-wrap items-center gap-2">
                {influencer.channels?.map((channel) => {
                  const platform = PlatformData[channel.platform];
                  const Icon = platform.Icon;
                  return (
                    <div key={channel.id} className="flex items-center gap-2 border rounded-sm px-2 py-1 w-max">
                      <Icon />
                      <Link
                        target="_blank"
                        href={`${platform.url}${channel.userName}`}
                        className="text-blue-500 font-semibold text-xs hover:underline"
                      >
                        {`${estimateFollowers(channel.followersCount)} theo dõi`}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm md:text-base">{influencer.description}</p>
        </div>
      </div>
      <Packages data={influencer.packages} />
      <InfluencerList className="mt-20" title="Những người nổi tiếng tương tự" />
    </div>
  );
};

export default InfluencerDetails;
