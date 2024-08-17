import { FC } from 'react';
import Image from 'next/image';
import { LuInstagram, LuYoutube } from 'react-icons/lu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { estimateFollowers } from '@/lib/utils';
import { LuHeart, LuShare } from 'react-icons/lu';
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { PlatformEnum } from '@/types/enum';
import { RiTiktokLine } from 'react-icons/ri';
import Tooltip from '@/components/custom/tooltip';

interface InfluencerInfoProps {
  item: {
    id?: string;
    imagesGallery?: ImageModel[];
    avatar?: ImageModel;
    fullName: string;
    jobTitle?: string;
    description?: string;
    address?: string;
    socialAccounts?: SocialAccModel[];
    portfolioVideos?: string[];
  };
}

interface SocialAccModel {
  platform?: number;
  followers?: number;
}

export interface ImageModel {
  url?: string;
}

const PersonalInfo: FC<InfluencerInfoProps> = (props) => {
  const { fullName, address, avatar, description, imagesGallery, jobTitle, portfolioVideos, socialAccounts } =
    props.item;
  return (
    <div>
      <div className="hidden md:flex space-x-1 justify-end mb-4">
        <Button variant="ghost" startIcon={<LuShare />}>
          <span>Chia Sẻ</span>
        </Button>
        <Button variant="ghost" startIcon={<LuHeart />}>
          <span>Yêu thích</span>
        </Button>
      </div>
      <Carousel opts={{ align: 'start' }} className="max-md:-mx-6 md:rounded-lg overflow-hidden">
        <CarouselContent>
          {imagesGallery?.map((img, index) => (
            <CarouselItem key={index} className="lg:basis-1/3 md:basis-1/2 max-md:pl-0">
              <Image
                src={img.url || ''}
                alt="Profile pictures"
                width={380}
                height={380}
                className="w-full md:aspect-thumbnail aspect-square object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div>
        <div className="flex my-4 items-center space-x-4">
          <div className="flex flex-col items-center">
            <Avatar className="w-16 h-16 md:w-24 md:h-24">
              <AvatarImage width={200} src={avatar?.url} alt="Avatar" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="md:hidden flex">
              <Tooltip label="Chia sẻ">
                <Button variant="ghost" size="icon" startIcon={<LuShare size="16" />} />
              </Tooltip>
              <Tooltip label="Yêu thích">
                <Button variant="ghost" size="icon" startIcon={<LuHeart size="16" />}></Button>
              </Tooltip>
            </div>
          </div>
          <div className="pl-4 md:pl-0 flex-1">
            <h5 className="font-semibold text-xl md:text-2xl">
              {fullName} | {jobTitle}
            </h5>
            <p className="my-2 text-muted-foreground text-sm">{address}</p>
            <div className="flex items-center gap-2 ">
              {socialAccounts?.map((account) => (
                <div
                  key={account.platform}
                  className="flex items-center gap-2 border-2 border-gray-300 rounded-sm px-2 py-1 w-max"
                >
                  {account.platform === PlatformEnum.Instagram ? (
                    <LuInstagram />
                  ) : account.platform === PlatformEnum.YouTube ? (
                    <LuYoutube />
                  ) : account.platform === PlatformEnum.TitTok ? (
                    <RiTiktokLine />
                  ) : (
                    ''
                  )}
                  <Link
                    target="_blank"
                    href={
                      account.platform === PlatformEnum.Instagram
                        ? `https://www.instagram.com/${''}`
                        : account.platform === PlatformEnum.YouTube
                        ? `https://www.youtube.com/${''}`
                        : account.platform === PlatformEnum.TitTok
                        ? `https://www.tiktok.com/${''}`
                        : ''
                    }
                    className="text-blue-500 font-semibold text-xs hover:underline"
                  >
                    {`${estimateFollowers(account.followers!)} Followers`}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground md:text-base">{description}</p>
      </div>
    </div>
  );
};

export default PersonalInfo;
