import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import config from '@/config';
import { formats } from '@/lib/utils';
import { campaignsRequest } from '@/request';
import { CalendarIcon, EyeOpenIcon, GearIcon, Pencil2Icon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FC } from 'react';
import Member from './member';
import Performance from './performance';
import Actions from './components/actions';
import Contents from './contents';
import { ECampaignStatus } from '@/types/enum';

interface TrackingProps {
  params: { id: string };
  searchParams: {
    tab?: string;
  };
}

const Tracking: FC<TrackingProps> = async ({ params, searchParams }) => {
  const campaign = await campaignsRequest
    .getCampaignById(params.id)
    .then((res) => res.data)
    .catch(() => notFound());

  if (!campaign) return notFound();

  return (
    <div className="container mt-8 mb-16">
      <div className="flex items-center justify-between mb-12">
        <div className="space-y-2 flex-1">
          <h1 className="text-3xl font-semibold">{campaign.title}</h1>
          <p className="flex items-center gap-2">
            <CalendarIcon />
            {formats.date(campaign.startDate)} - {formats.date(campaign.endDate)}
          </p>
          <Actions />
        </div>
        <div className="max-md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <GearIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={config.routes.campaigns.details(params.id)} className="flex items-center gap-2">
                  <EyeOpenIcon />
                  Xem chi tiết
                </Link>
              </DropdownMenuItem>
              {[ECampaignStatus.Draft, ECampaignStatus.Published].includes(campaign.status) && (
                <DropdownMenuItem asChild>
                  <Link href={config.routes.brand.campaigns.edit(params.id, 1)} className="flex items-center gap-2">
                    <Pencil2Icon />
                    Chỉnh sửa
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Tabs defaultValue={searchParams.tab || 'member'}>
        <TabsList className="grid w-full md:grid-cols-3 grid-cols-2 *:flex *:max-lg:flex-col *:items-center *:gap-2">
          <TabsTrigger value="member" className="flex items-center gap-2 py-2" asChild>
            <Link href="?tab=member">Người tham gia</Link>
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2 py-2" asChild>
            <Link href="?tab=content">Nội dung đăng tải</Link>
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2 py-2" asChild>
            <Link href="?tab=performance">Hiệu suất</Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="member">
          <Member />
        </TabsContent>
        <TabsContent value="performance">
          <Performance />
        </TabsContent>
        <TabsContent value="content">
          <Contents />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tracking;
