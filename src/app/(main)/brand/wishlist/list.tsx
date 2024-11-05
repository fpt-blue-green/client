'use client';

import InfluencerCard, { InfluencerCardSkeleton } from '@/components/influencer-card';
import NoData from '@/components/no-data';
import { fetchRequest } from '@/request';

const List = () => {
  const { data, isLoading } = fetchRequest.favorites(true);

  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-8">
      {isLoading ? (
        Array.from({ length: 20 }).map((_, index) => <InfluencerCardSkeleton key={index} />)
      ) : data && data.length > 0 ? (
        data.map((influencer) => <InfluencerCard key={influencer.id} data={influencer} />)
      ) : (
        <NoData description="Bạn chưa thêm ai vào danh sách yêu thích" className="col-span-full" />
      )}
    </div>
  );
};
export default List;
