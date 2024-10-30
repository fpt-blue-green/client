'use client';

import NoData from '@/components/no-data';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import CampaignCard from '@/components/campaign-card';
import PremiumBadge from '@/components/custom/premium-badge';
import { useAuthBrand, useMount } from '@/hooks';
import { fetchRequest } from '@/request';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RiCalendarScheduleFill } from 'react-icons/ri';
import { FaChartSimple, FaFirstdraft, FaGlobe } from 'react-icons/fa6';
import { SiCampaignmonitor } from 'react-icons/si';
import Link from 'next/link';
import config from '@/config';
import { ECampaignStatus } from '@/types/enum';
import { useState } from 'react';

const List = () => {
  const { profile } = useAuthBrand();
  const [statuses, setStatuses] = useState<ECampaignStatus[]>();
  const { data, isLoading, mutate } = fetchRequest.campaign.currentBrand(!!profile, statuses);

  useMount(() => {
    mutate();
  });

  const reload = async () => {
    await mutate();
  };

  const canCreate = Boolean(profile?.isPremium || (data && data.items.length === 0));

  const handleTabChange = (value: string) => {
    if (value === 'all') {
      setStatuses(undefined);
    } else {
      const values = value.split('|').map((status) => {
        return +status as unknown as ECampaignStatus;
      });
      setStatuses(values);
    }
  };

  return (
    <div className="space-y-7">
      <h1 className="flex items-center justify-between text-2xl font-semibold">
        Chiến dịch
        <PremiumBadge invisible={canCreate}>
          <Button variant="foreground" size="large" disabled={!canCreate} asChild>
            <Link href={config.routes.brand.campaigns.edit('new', 1)}>Đăng một chiến dịch</Link>
          </Button>
        </PremiumBadge>
      </h1>
      <Tabs defaultValue="all" onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-5 *:flex *:max-lg:flex-col *:items-center *:gap-2">
          <TabsTrigger value="all" className="flex items-center gap-2 py-2">
            <SiCampaignmonitor />
            <span className="max-md:sr-only">Tất cả</span>
          </TabsTrigger>
          <TabsTrigger value={ECampaignStatus.Draft.toString()} className="flex items-center gap-2 py-2">
            <FaFirstdraft />
            <span className="max-md:sr-only">Bản nháp</span>
          </TabsTrigger>
          <TabsTrigger value={ECampaignStatus.Published.toString()} className="flex items-center gap-2 py-2">
            <FaGlobe />
            <span className="max-md:sr-only">Công khai</span>
          </TabsTrigger>
          <TabsTrigger value={ECampaignStatus.Active.toString()} className="flex items-center gap-2 py-2">
            <FaChartSimple />
            <span className="max-md:sr-only">Đang thực hiện</span>
          </TabsTrigger>
          <TabsTrigger
            value={`${ECampaignStatus.Completed}|${ECampaignStatus.Expired}`}
            className="flex items-center gap-2 py-2"
          >
            <RiCalendarScheduleFill />
            <span className="max-md:sr-only">Đã kết thúc</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-x-6 gap-y-8">
        {isLoading ? (
          Array.from({ length: 12 }).map((_, index) => <Skeleton key={index} className="h-40" />)
        ) : data && data.items.length > 0 ? (
          data.items.map((campaign) => <CampaignCard key={campaign.id} data={campaign} canEdit reload={reload} />)
        ) : (
          <NoData description="Không có chiến dịch" className="col-span-full" />
        )}
      </div>
    </div>
  );
};
export default List;
