import { formats } from '@/lib/utils';
import { IUserTopRevenue } from '@/types/influencer';
import Image from 'next/image';
import { FC } from 'react';

interface CardCampaignProps {
  details: IUserTopRevenue;
}

const CardCampaign: FC<CardCampaignProps> = (props) => {
  const { amount, avatar, displayName, email } = props.details;
  const noAvatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZfYb4CWzn9zbn-jLTwei46uk0dMEgMsh3gQ&s';
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2">
        <Image
          src={avatar || noAvatar}
          alt="Cover profile"
          width={40}
          height={40}
          className="aspect-square object-cover rounded-full"
        />
        <div className="flex flex-col">
          <p className="font-medium text-sm">{displayName}</p>
          <p className="text-muted-foreground text-sm">{email}</p>
        </div>
      </div>
      <h3 className="font-semibold">{formats.price(amount)}</h3>
    </div>
  );
};

export default CardCampaign;
