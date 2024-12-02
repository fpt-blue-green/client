'use client';
import Card from './components/card-overview';
import { FaPeopleGroup, FaSackDollar } from 'react-icons/fa6';
import { PersonIcon } from '@radix-ui/react-icons';
import { FaProjectDiagram } from 'react-icons/fa';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchRequest } from '@/request';

const AnalyticsCards = () => {
  const { data } = fetchRequest.metricTrends();
  return data ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      <Card item={data[0]} icon={<FaSackDollar className="text-muted-foreground" />} />
      <Card item={data[1]} icon={<PersonIcon className="text-muted-foreground" />} />
      <Card item={data[2]} icon={<FaPeopleGroup className="text-muted-foreground" />} />
      <Card item={data[3]} icon={<FaProjectDiagram className="text-muted-foreground" />} />
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      {Array(4)
        .fill(null)
        .map((_, index) => (
          <Skeleton key={index} className="w-full h-4" />
        ))}
    </div>
  );
};

export default AnalyticsCards;
