'use client';

import { Accordion } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import InfluencerAccordion from './influencer-accordion';
import { fetchRequest } from '@/request';
import { useParams } from 'next/navigation';

const Member = () => {
  const params = useParams<{ id: string }>();
  const { data } = fetchRequest.campaign.trackingInfluencers(params.id, [], []);
  const styles = (active = false, isLast = false) =>
    cn(
      'relative flex flex-col gap-2 py-4 px-8 bg-muted shadow-sm hover:z-1 hover:opacity-70 cursor-pointer transition-opacity',
      {
        'after:absolute after:z-5 after:size-10 after:bg-muted after:rotate-45 after:top-1/2 after:right-0 after:translate-x-1/2 after:border-8 after:border-t-background after:border-r-background after:border-l-muted after:border-b-muted':
          !isLast,
        'bg-primary after:bg-primary after:border-l-primary after:border-b-primary': active,
      },
    );

  return (
    <div>
      <div className="grid grid-cols-4 gap-2">
        <div className={styles()}>
          <span className="text-xl font-bold">1</span>
          <span className="text-sm">Lời đề nghị</span>
        </div>
        <div className={styles()}>
          <span className="text-xl font-bold">1</span>
          <span className="text-sm">Chờ xác nhận</span>
        </div>
        <div className={styles()}>
          <span className="text-xl font-bold">1</span>
          <span className="text-sm">Đặt cọc</span>
        </div>
        <div className={styles()}>
          <span className="text-xl font-bold">1</span>
          <span className="text-sm">Tham gia</span>
        </div>
        <div className={styles()}>
          <span className="text-xl font-bold">1</span>
          <span className="text-sm">Gửi sản phẩm</span>
        </div>
        <div className={styles()}>
          <span className="text-xl font-bold">1</span>
          <span className="text-sm">Thanh toán</span>
        </div>
        <div className={styles()}>
          <span className="text-xl font-bold">1</span>
          <span className="text-sm">Hoàn thành</span>
        </div>
        <div className={styles(true, true)}>
          <span className="text-xl font-bold">1</span>
          <span className="text-sm">Đã hủy</span>
        </div>
      </div>
      <div className="mt-8">
        <Accordion type="multiple" className="w-full">
          {data?.items.map((item) => (
            <InfluencerAccordion key={item.id} item={item} />
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default Member;
