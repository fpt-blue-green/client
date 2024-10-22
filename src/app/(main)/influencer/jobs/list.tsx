'use client';

import { fetchRequest } from '@/request';
import JobCard from './job-card';
import Paper from '@/components/custom/paper';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn, constants } from '@/lib/utils';
import { ECampaignStatus, EJobStatus } from '@/types/enum';
import { useState } from 'react';

const List = () => {
  const { data } = fetchRequest.influencer.jobs();
  const [jobStatus, setJobStatus] = useState('all');
  const [campaignStatus, setCampaignStatus] = useState('all');

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
          <Paper
            className="p-0 text-center font-semibold cursor-pointer col-span-full md:col-span-1 lg:col-span-full"
            onClick={() => setJobStatus(EJobStatus.Completed.toString())}
          >
            <div className="p-3 text-sm bg-success">Hoàn thành</div>
            <div className="p-3 text-xl">4</div>
          </Paper>
          <Paper
            className="p-0 text-center font-semibold cursor-pointer"
            onClick={() => setJobStatus(EJobStatus.Pending.toString())}
          >
            <div className="p-3 text-sm bg-warning">Chờ xác nhận</div>
            <div className="p-3 text-xl">4</div>
          </Paper>
          <Paper
            className="p-0 text-center font-semibold cursor-pointer"
            onClick={() => setJobStatus(EJobStatus.InProgress.toString())}
          >
            <div className="p-3 text-sm bg-info">Đang thực hiện</div>
            <div className="p-3 text-xl">0</div>
          </Paper>
          <Paper
            className="p-0 text-center font-semibold cursor-pointer"
            onClick={() => setJobStatus(EJobStatus.Failed.toString())}
          >
            <div className="p-3 text-sm bg-secondary">Không đạt</div>
            <div className="p-3 text-xl">4</div>
          </Paper>
          <Paper
            className="p-0 text-center font-semibold cursor-pointer"
            onClick={() => setJobStatus(EJobStatus.NotCreated.toString())}
          >
            <div className="p-3 text-sm bg-destructive">Từ chối</div>
            <div className="p-3 text-xl">4</div>
          </Paper>
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
        {data?.map((job) => (
          <JobCard key={job.id} item={job} />
        ))}
      </div>
    </div>
  );
};

export default List;
