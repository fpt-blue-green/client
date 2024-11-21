'use client';

import { Accordion } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import InfluencerAccordion from './components/influencer-accordion';
import { fetchRequest } from '@/request';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { EJobStatus, EOfferStatus } from '@/types/enum';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import NoData from '@/components/no-data';

const Member = () => {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const status = searchParams.get('status') || 'pending';
  const [jobStatuses, setJobStatuses] = useState<EJobStatus[]>([EJobStatus.Pending]);
  const [offerStatuses, setOfferStatuses] = useState<EOfferStatus[]>([EOfferStatus.Offering]);
  const { data: statistical } = fetchRequest.campaign.memberStatistical(params.id);
  const { data, isLoading, mutate } = fetchRequest.campaign.members(params.id, jobStatuses, offerStatuses);
  const styles = (active = false, isLast = false) =>
    cn('relative flex flex-col gap-2 py-4 px-8 bg-muted shadow-sm hover:z-1 hover:opacity-70 transition-opacity', {
      'after:absolute after:z-5 after:size-9 after:bg-muted after:rotate-45 after:top-1/2 after:right-0 after:translate-x-1/2 after:border-8 after:border-t-background after:border-r-background after:border-l-muted after:border-b-muted':
        !isLast,
      'bg-primary': active,
      'after:bg-primary after:border-l-primary after:border-b-primary': !isLast && active,
    });

  const reload = async () => {
    await mutate();
  };

  useEffect(() => {
    switch (status) {
      case 'pending':
        setJobStatuses([EJobStatus.Pending]);
        setOfferStatuses([EOfferStatus.Offering]);
        break;
      case 'budgeting':
        setJobStatuses([EJobStatus.Pending]);
        setOfferStatuses([EOfferStatus.WaitingPayment]);
        break;
      case 'joined':
        setJobStatuses([EJobStatus.Approved, EJobStatus.InProgress]);
        setOfferStatuses([EOfferStatus.Done]);
        break;
      case 'fulfillment':
        setJobStatuses([EJobStatus.Completed, EJobStatus.Failed]);
        setOfferStatuses([]);
        break;
      case 'archived':
        setJobStatuses([EJobStatus.NotCreated]);
        setOfferStatuses([]);
        break;
      default:
        break;
    }
  }, [status]);

  return (
    <div>
      <div className="grid grid-cols-5 gap-2">
        <Link href="?tab=member&status=pending" className={styles(status === 'pending')}>
          <span className="text-xl font-bold">{statistical?.[0] || 0}</span>
          <span className="text-sm">Chờ xác nhận</span>
        </Link>
        <Link href="?tab=member&status=budgeting" className={styles(status === 'budgeting')}>
          <span className="text-xl font-bold">{statistical?.[1] || 0}</span>
          <span className="text-sm">Đặt cọc</span>
        </Link>
        <Link href="?tab=member&status=joined" className={styles(status === 'joined')}>
          <span className="text-xl font-bold">{statistical?.[2] || 0}</span>
          <span className="text-sm">Đã tham gia</span>
        </Link>
        <Link href="?tab=member&status=fulfillment" className={styles(status === 'fulfillment')}>
          <span className="text-xl font-bold">{statistical?.[3] || 0}</span>
          <span className="text-sm">Hoàn thành</span>
        </Link>
        <Link href="?tab=member&status=archived" className={styles(status === 'archived', true)}>
          <span className="text-xl font-bold">{statistical?.[4] || 0}</span>
          <span className="text-sm">Đã hủy</span>
        </Link>
      </div>
      <div className="mt-8">
        <Accordion type="multiple" className="w-full">
          {isLoading ? (
            Array(5).map((_, index) => <Skeleton key={index} className="h-12" />)
          ) : data && data.items.length > 0 ? (
            data.items.map((item) => <InfluencerAccordion key={item.id} item={item} reload={reload} />)
          ) : (
            <NoData />
          )}
        </Accordion>
      </div>
    </div>
  );
};

export default Member;
