import React from 'react';
import Image from 'next/image';
import { LuGalleryHorizontalEnd, LuInstagram, LuYoutube } from 'react-icons/lu';

import { InfluencerInfoProps } from '@/types/user';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { estimateFollowers } from '@/lib/utils';

const PersonalInfo: React.FC<InfluencerInfoProps> = (props) => {
  const { fullName, address, avatar, description, imagesGallery, jobTitle, portfolioVideos, socialAccounts } =
    props.influencer;
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
          <div className="hidden md:flex  items-center space-x-2 absolute right-6 bottom-5 bg-background p-2 rounded-md cursor-pointer border-zinc-900">
            <LuGalleryHorizontalEnd />
            <p>Show All Photos</p>
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
                <span className="text-blue-500 font-semibold text-xs">{estimateFollowers(account.followers!)}</span>
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
