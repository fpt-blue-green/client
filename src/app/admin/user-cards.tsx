'use client';
import CardCampaign from './components/card-campaign';
import { IUserTopRevenue } from '@/types/influencer';
import { fetcher } from '@/lib/http';
import useSWRImmutable from 'swr/immutable';

const UserCards = () => {
  const { data: items } = useSWRImmutable<IUserTopRevenue[]>('/AdminStatistic/topFiveInfluencerUser', fetcher);

  return (
    <div className="mt-8 flex flex-col gap-8">
      {items &&
        items.length !== 0 &&
        items.map((item: IUserTopRevenue) => <CardCampaign key={item.displayName} details={item} />)}
    </div>
  );
};

export default UserCards;
