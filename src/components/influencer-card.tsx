import config from '@/config';
import { formats } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Skeleton } from './ui/skeleton';

const InfluencerCard = () => {
  return (
    <Link href={config.routes.influencer.details('yenphuong')} className="space-y-1.5">
      <div className="relative rounded-lg overflow-hidden group">
        <Image
          src="https://scontent.fhan5-2.fna.fbcdn.net/v/t39.30808-6/454530341_523941173319997_4319077826762337608_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHfWjALriNSn9uF5PbBuViLKxA69Vi6aM8rEDr1WLpoz0ymNF_anj5JLNl0fE-pJn6YUTUwSNDo61IOyl9S-6Sf&_nc_ohc=zqj-SlzFHcgQ7kNvgF2Blnc&_nc_ht=scontent.fhan5-2.fna&oh=00_AYCfBS7pXZTUYju-OjYFjO-NrNe3H0TULkwPu_G4d5gLIg&oe=66BA6169"
          alt="Name"
          width={400}
          height={600}
          className="aspect-thumbnail object-cover transition-transform w-full group-hover:scale-110"
        />
        <div className="absolute left-0 top-0 right-0 bottom-0 bg-bg-gradient-to-b from-foreground/5 from-75% to-foreground"></div>
        <div className="absolute left-3 bottom-2 text-background">
          <h6 className="font-semibold">Influencer Name</h6>
          <span className="text-sm">Đà Nẵng, Việt Nam</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-medium text-muted-foreground">Platform</span>
        <span className="font-bold">{formats.price(500000)}</span>
      </div>
      <div className="text-sm">Lifestyle & Fashion content creator</div>
    </Link>
  );
};

export const InfluencerCardSkeleton = () => {
  return (
    <div className="space-y-1.5">
      <div className="relative pb-[133.33333%]">
        <Skeleton className="absolute inset-0" />
      </div>
      <div className="flex justify-between">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/3" />
      </div>
      <Skeleton className="h-4 w-full" />
    </div>
  );
};

export default InfluencerCard;
