'use client';

import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FC, useState } from 'react';
import { PlatformData } from '@/types/enum';
import { formats } from '@/lib/utils';
import OfferDialog from '@/components/offer-dialog';
import ICampaign from '@/types/campaign';

interface ContentsProps {
  campaign: ICampaign;
}

const Contents: FC<ContentsProps> = ({ campaign }) => {
  const [tab, setTab] = useState('all');

  return (
    <div>
      <Tabs defaultValue="all" value={tab} onValueChange={setTab}>
        <TabsList className="h-11 mb-8">
          <TabsTrigger value="all" className="py-2 px-5">
            Tất cả
          </TabsTrigger>
          {Object.entries(PlatformData)
            .filter(([key]) => campaign?.contents.some((p) => p.platform === +key))
            .map(([key, value]) => (
              <TabsTrigger key={key} value={key} className="py-2 px-5">
                {value.name}
              </TabsTrigger>
            ))}
        </TabsList>
      </Tabs>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-8">
        {campaign.contents
          .filter((pack) => tab === 'all' || pack.platform === +tab)
          .map((pack) => {
            const { contentTypes, Icon } = PlatformData[pack.platform];

            return (
              <div className="border border-foreground px-5 py-4 rounded-sm" key={pack.id}>
                <div className="flex items-center justify-between gap-4">
                  <span className="font-semibold">{`${pack.quantity} ${contentTypes[pack.contentType]}`}</span>
                  <span className="font-semibold">{formats.price(pack.price)}</span>
                </div>
                <p className="mt-4 text-muted-foreground text-sm">{pack.description}</p>
                <div className="flex items-center justify-between mt-8">
                  <div className="flex items-center justify-center size-9 text-background bg-foreground rounded-md">
                    <Icon className="size-6" />
                  </div>
                  <OfferDialog data={pack} campaign={campaign} asChild>
                    <Button variant="foreground">Tiếp tục</Button>
                  </OfferDialog>
                </div>
              </div>
            );
          })}
      </div>
      <div className="border border-foreground px-5 py-4 rounded-sm max-w-3xl mt-6">
        <div className="flex items-center justify-between space-x-2">
          <h4 className="font-semibold">Có yêu cầu nào chưa được đề xuất không?</h4>
          <OfferDialog campaign={campaign} asChild>
            <Button variant="foreground">Gửi Đề Xuất</Button>
          </OfferDialog>
        </div>
      </div>
    </div>
  );
};

export default Contents;
