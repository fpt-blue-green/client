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
import { LuAreaChart, LuPlaySquare, LuUserSquare } from 'react-icons/lu';

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
      <Tabs value={searchParams.tab || 'member'}>
        <TabsList className="grid w-full md:grid-cols-3 grid-cols-2 *:flex *:max-lg:flex-col *:items-center *:gap-2">
          <TabsTrigger value="member" asChild>
            <Link href="?tab=member" className="flex items-center gap-2">
              <LuUserSquare className="size-5" />
              Người tham gia
            </Link>
          </TabsTrigger>
          <TabsTrigger value="content" asChild>
            <Link href="?tab=content" className="flex items-center gap-2">
              <LuPlaySquare className="size-5" />
              Nội dung đăng tải
            </Link>
          </TabsTrigger>
          <TabsTrigger value="performance" asChild>
            <Link href="?tab=performance" className="flex items-center gap-2">
              <LuAreaChart className="size-5" />
              Số liệu phân tích
            </Link>
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
