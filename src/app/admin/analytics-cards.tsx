'use client';
import { fetcher } from '@/lib/http';
import IMetricTrend from '@/types/analytics';
import useSWRImmutable from 'swr/immutable';
import Card from './components/card-overview';
import { FaPeopleGroup, FaSackDollar } from 'react-icons/fa6';
import { PersonIcon } from '@radix-ui/react-icons';
import { FaProjectDiagram } from 'react-icons/fa';
import { Skeleton } from '@/components/ui/skeleton';

const AnalyticsCards = () => {
  const { data } = useSWRImmutable<IMetricTrend[]>('/AdminStatistic/monthlyMetricsTrend', fetcher);
  return data ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      <Card item={data[0]} icon={<FaSackDollar className="text-muted-foreground" />} />
      <Card item={data[1]} icon={<PersonIcon className="text-muted-foreground" />} />
      <Card item={data[2]} icon={<FaPeopleGroup className="text-muted-foreground" />} />
      <Card item={data[3]} icon={<FaProjectDiagram className="text-muted-foreground" />} />
    </div>
  ) : (
    <Skeleton className="w-full h-4 flex" />
  );
};

export default AnalyticsCards;