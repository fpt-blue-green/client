import { FC } from 'react';
import Image from 'next/image';
import { LuInstagram, LuYoutube } from 'react-icons/lu';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { estimateFollowers } from '@/lib/utils';
import GalleryModal from './gallery-modal';
import Link from 'next/link';

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
  platformName?: string;
  followers?: number;
}

export interface ImageModel {
  url?: string;
}

const PersonalInfo: FC<InfluencerInfoProps> = (props) => {
  const { fullName, address, avatar, description, imagesGallery, jobTitle, portfolioVideos, socialAccounts } =
    props.item;
  return (
    <div className="container ">
      <div className="grid grid-cols-3 gap-2 ">
        <div>
          <Image
            src={imagesGallery?.[0].url || ''}
            alt={'Profile pictures'}
            width={380}
            height={380}
            className="rounded-s-lg w-full aspect-thumbnail object-cover"
          />
        </div>
        <div>
          <Image
            src={imagesGallery?.[1].url || ''}
            alt={'Profile pictures'}
            width={380}
            height={380}
            className="w-full aspect-thumbnail object-cover"
          />
        </div>
        <div className="relative">
          <Image
            src={imagesGallery?.[2].url || ''}
            alt={'Profile pictures'}
            width={380}
            height={380}
            className="rounded-e-lg w-full aspect-thumbnail object-cover"
          />
          <div className="absolute hidden md:block md:right-0 md:bottom-3 ">
            <GalleryModal gallery={imagesGallery || []} />
          </div>
        </div>
      </div>
      <div className="flex my-4 items-center space-x-4">
        <Avatar className="w-24 h-24">
          <AvatarImage width={200} src={avatar?.url} alt="Avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h5 className="font-semibold text-2xl">
            {fullName} | {jobTitle}
          </h5>
          <p className="my-2 text-muted-foreground text-sm">{address}</p>
          <div className="flex items-center gap-2 ">
            {socialAccounts?.map((account) => (
              <div
                key={account.platformName}
                className="flex items-center gap-2 border-2 border-gray-300 rounded-sm px-2 py-1 w-max"
              >
                {account.platformName === 'Instagram' ? <LuInstagram /> : <LuYoutube />}
                <Link
                  target="_blank"
                  href={
                    account.platformName === 'Instagram'
                      ? `https://www.instagram.com/${''}`
                      : `https://www.youtube.com/${''}`
                  }
                  className="text-blue-500 font-semibold text-xs hover:underline"
                >
                  {estimateFollowers(account.followers!)}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="text-muted-foreground text-[16px]">{description}</p>
    </div>
  );
};

export default PersonalInfo;
