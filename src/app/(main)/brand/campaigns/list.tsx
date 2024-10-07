'use client';

import NoData from '@/components/no-data';
import { Skeleton } from '@/components/ui/skeleton';
import { fetcher } from '@/lib/http';
import ICampaign from '@/types/campaign';
import useSWRImmutable from 'swr/immutable';
import CreateForm from './create-form';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import CampaignCard from './campaign-card';
import { useState } from 'react';
import PremiumBadge from '@/components/custom/premium-badge';
import IBrand from '@/types/brand';

const List = () => {
  const { data, isLoading } = useSWRImmutable<ICampaign[]>('/Brand/campaigns', fetcher);
  const { data: profile } = useSWRImmutable<IBrand>('/Brand', fetcher);
  const [open, setOpen] = useState(false);
  const [campaign, setCampaign] = useState<ICampaign>();

  const handleOpen = (campaign?: ICampaign) => () => {
    setOpen(true);
    setCampaign(campaign);
  };

  const canCreate = Boolean(profile?.isPremium || (data?.length && data.length === 0));

  return (
    <div className="space-y-7">
      <h1 className="flex items-center justify-between text-2xl font-semibold">
        Chiến dịch
        <Dialog open={open} onOpenChange={setOpen} modal>
          <PremiumBadge invisible={canCreate}>
            <DialogTrigger asChild>
              <Button variant="foreground" size="large" onClick={handleOpen()} disabled={!canCreate}>
                Đăng một chiến dịch
              </Button>
            </DialogTrigger>
          </PremiumBadge>
          <DialogContent className="max-w-2xl" onPointerDownOutside={(e) => e.preventDefault()}>
            <CreateForm campaign={campaign} />
          </DialogContent>
        </Dialog>
      </h1>
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-x-6 gap-y-8">
        {isLoading ? (
          Array.from({ length: 12 }).map((_, index) => <Skeleton key={index} className="h-40" />)
        ) : data && data.length > 0 ? (
          data.map((campaign) => <CampaignCard key={campaign.id} data={campaign} onEdit={handleOpen} />)
        ) : (
          <NoData description="Không có chiến dịch" className="col-span-full" />
        )}
      </div>
    </div>
  );
};
export default List;