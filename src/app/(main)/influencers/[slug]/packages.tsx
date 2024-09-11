'use client';

import { Button } from '@/components/ui/button';
import HowPackagesWork from './how-packages-work-modal';
import { formats } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FC, useState } from 'react';
import { PlatformData } from '@/types/enum';
import { IPackage } from '@/types/influencer';

interface PackagesProps {
  data: IPackage[];
}

const Packages: FC<PackagesProps> = ({ data }) => {
  const [tab, setTab] = useState('all');

  return (
    <div className="mt-16">
      <div className="flex items-center space-x-3 mb-5">
        <h3 className="font-semibold text-2xl">Gói</h3>
        <HowPackagesWork />
      </div>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data
          .filter((pack) => tab === 'all' || pack.platform === +tab)
          .map((pack) => {
            const { contentTypes, Icon } = PlatformData[pack.platform];

            return (
              <div className="border border-foreground px-5 py-4 rounded-sm" key={pack.id}>
                <div className="flex items-center justify-between gap-4">
                  <span className="font-semibold text-lg">{`${pack.quantity} ${contentTypes[pack.contentType]}`}</span>
                  <span className="font-semibold text-lg">{formats.price(pack.price)}</span>
                </div>
                <p className="mt-4 text-muted-foreground text-sm">{pack.description}</p>
                <div className="flex items-center justify-between mt-8">
                  <Icon className="size-6" />
                  <Button variant="gradient" size="large" className="text-base">
                    Tiếp tục
                  </Button>
                </div>
              </div>
            );
          })}
      </div>
      <div className="border border-foreground px-5 py-4 rounded-sm max-w-3xl mt-6">
        <div className="flex items-center justify-between space-x-2">
          <h4 className="font-semibold text-lg">Có yêu cầu nào chưa được đề xuất không?</h4>
          <Button variant="gradient" size="large" className="text-base">
            Gửi Đề Xuất
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Packages;
