'use client';

import { Button } from '@/components/ui/button';
import { formats } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FC, useState } from 'react';
import { PlatformData } from '@/types/enum';
import { IPackage } from '@/types/offer';
import OfferDialog from '@/components/offer-dialog';

interface PackagesProps {
  data: IPackage[];
}

const Packages: FC<PackagesProps> = ({ data }) => {
  const [tab, setTab] = useState('all');

  return (
    <div>
      <Tabs defaultValue="all" value={tab} onValueChange={setTab}>
        <TabsList className="h-11 mb-8">
          <TabsTrigger value="all" className="py-2 px-5">
            Tất cả
          </TabsTrigger>
          {Object.entries(PlatformData)
            .filter(([key]) => data.some((p) => p.platform === +key))
            .map(([key, value]) => (
              <TabsTrigger key={key} value={key} className="py-2 px-5">
                {value.name}
              </TabsTrigger>
            ))}
        </TabsList>
      </Tabs>
      <div className="flex flex-col gap-6">
        {data
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
                  <OfferDialog asChild>
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
          <Button variant="foreground">Gửi Đề Xuất</Button>
        </div>
      </div>
    </div>
  );
};

export default Packages;
