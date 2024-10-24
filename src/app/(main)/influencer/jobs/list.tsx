'use client';

import { fetchRequest } from '@/request';
import JobCard from './job-card';
import Paper from '@/components/custom/paper';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn, constants } from '@/lib/utils';
import { ECampaignStatus, EJobStatus } from '@/types/enum';
import { useLayoutEffect, useState } from 'react';
import NoData from '@/components/no-data';
import { Skeleton } from '@/components/ui/skeleton';
import Pagination from '@/components/custom/pagination';

const PAGE_SIZE = 10;

const List = () => {
  const [page, setPage] = useState(1);
  const [jobStatus, setJobStatus] = useState('all');
  const [campaignStatus, setCampaignStatus] = useState('all');
  const cStatus = campaignStatus === 'all' ? undefined : (campaignStatus as unknown as ECampaignStatus);
  const jStatus = jobStatus === 'all' ? undefined : (jobStatus as unknown as EJobStatus);
  const { data, isLoading } = fetchRequest.influencer.jobs(page, PAGE_SIZE, cStatus, jStatus);
  const { data: statistical } = fetchRequest.job.statistical();
  const [pageCount, setPageCount] = useState(0);

  useLayoutEffect(() => {
    if (!isLoading) {
      setPageCount(data ? Math.ceil(data.totalCount / PAGE_SIZE) : 0);
    }
  }, [data, isLoading]);

  const filterItemStyles = (color: string) =>
    cn('inline-flex items-center gap-2 before:size-2 before:rounded', {
      'before:bg-success': color === 'success',
      'before:bg-warning': color === 'warning',
      'before:bg-info': color === 'info',
      'before:bg-destructive': color === 'destructive',
      'before:bg-primary': color === 'primary',
      'before:bg-secondary': color === 'secondary',
    });

  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 gap-6">
      <div className="lg:order-last">
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-2 gap-4">
          {statistical?.map((item, index) => (
            <Paper
              className={cn('p-0 text-center font-semibold cursor-pointer', {
                'col-span-full md:col-span-1 lg:col-span-full order-first': item.jobStatus === EJobStatus.Completed,
              })}
              onClick={() => setJobStatus(item.jobStatus.toString())}
              key={index}
            >
              <div className={cn('p-3 text-sm', constants.jobStatus[item.jobStatus].backgroundColor)}>
                {constants.jobStatus[item.jobStatus].label}
              </div>
              <div className="p-3 text-xl">{item.count}</div>
            </Paper>
          ))}
        </div>
      </div>
      <div className="col-span-full">
        <div className="flex max-md:flex-col items-center gap-4">
          <Select value={jobStatus} onValueChange={(value) => setJobStatus(value)}>
            <SelectTrigger className="md:w-80">
              <SelectValue>
                <span className="font-semibold">Trạng thái công việc: </span>
                <span className={filterItemStyles(constants.jobStatus[jobStatus]?.color || 'primary')}>
                  {constants.jobStatus[jobStatus]?.label || 'Tất cả'}
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                <span className={filterItemStyles('primary')}>Tất cả</span>
              </SelectItem>
              {Object.entries(constants.jobStatus).map(([key, { color, label }]) => (
                <SelectItem key={key} value={key}>
                  <span className={filterItemStyles(color)}>{label}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={campaignStatus} onValueChange={(value) => setCampaignStatus(value)}>
            <SelectTrigger className="md:w-72">
              <SelectValue>
                <span className="font-semibold">Giai đoạn chiến dịch: </span>
                <span className={filterItemStyles(constants.campaignStatus[campaignStatus]?.color || 'primary')}>
                  {constants.campaignStatus[campaignStatus]?.label || 'Tất cả'}
                </span>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                <span className={filterItemStyles('primary')}>Tất cả</span>
              </SelectItem>
              {Object.entries(constants.campaignStatus)
                .filter(([key]) => +key !== ECampaignStatus.Draft)
                .map(([key, { color, label }]) => (
                  <SelectItem key={key} value={key}>
                    <span className={filterItemStyles(color)}>{label}</span>
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="h-52 rounded-lg" />)
        ) : data && data.totalCount === 0 ? (
          <NoData description="Không tìm thấy công việc" />
        ) : (
          data?.jobs.map((job) => <JobCard key={job.id} item={job} />)
        )}
        {pageCount > 1 && (
          <Pagination count={pageCount} page={page} boundaryCount={2} onPageChange={(value) => setPage(value)} />
        )}
      </div>
    </div>
  );
};

export default List;
