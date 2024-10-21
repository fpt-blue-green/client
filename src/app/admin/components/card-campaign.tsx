import { formats } from '@/lib/utils';
import Image from 'next/image';
import { FC } from 'react';

interface CardCampaignProps {
  details: {
    imageURL: string;
    title: string;
    description: string;
    budget: number;
  };
}

const CardCampaign: FC<CardCampaignProps> = (props) => {
  const { budget, description, imageURL, title } = props.details;
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2">
        <Image
          src={imageURL}
          alt="Cover profile"
          width={40}
          height={40}
          className="aspect-square object-cover rounded-full"
        />
        <div className="flex flex-col">
          <p className="font-medium text-sm">{title}</p>
          <p className="text-muted-foreground text-sm truncate max-w-40">{description}</p>
        </div>
      </div>
      <h3 className="font-semibold">{formats.price(budget)}</h3>
    </div>
  );
};

export default CardCampaign;
