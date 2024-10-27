'use client';

import { fetchRequest } from '@/request';
import JobCard from './job-card';
import Paper from '@/components/custom/paper';
import { cn, constants } from '@/lib/utils';
import { ECampaignStatus, EJobStatus, ERole } from '@/types/enum';
import { useLayoutEffect, useState } from 'react';
import NoData from '@/components/no-data';
import { Skeleton } from '@/components/ui/skeleton';
import Pagination from '@/components/custom/pagination';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FaChartSimple, FaHandshake, FaSuitcase, FaUserPlus } from 'react-icons/fa6';
import { RiCalendarScheduleFill } from 'react-icons/ri';

const PAGE_SIZE = 10;

interface JobFilter {
  campaigns?: ECampaignStatus[];
  jobs?: EJobStatus[];
  from?: ERole;
}

const List = () => {
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState('1');
  const [filter, setFilter] = useState<JobFilter>({ jobs: [EJobStatus.Pending], from: ERole.Brand });
  const { data, isLoading } = fetchRequest.influencer.jobs(page, PAGE_SIZE, filter.campaigns, filter.jobs, filter.from);
  const { data: statistical } = fetchRequest.job.statistical();
  const [pageCount, setPageCount] = useState(0);

  useLayoutEffect(() => {
    if (!isLoading) {
      setPageCount(data ? Math.ceil(data.totalCount / PAGE_SIZE) : 0);
    }
  }, [data, isLoading]);

  const handleChangeTab = (value: string) => {
    setTab(value);
    switch (value) {
      case '1':
        setFilter({ jobs: [EJobStatus.Pending], from: ERole.Brand });
        break;
      case '2':
        setFilter({ jobs: [EJobStatus.Pending], from: ERole.Influencer });
        break;
      case '3':
        setFilter({ jobs: [EJobStatus.Approved] });
        break;
      case '4':
        setFilter({ jobs: [EJobStatus.InProgress] });
        break;
      case '5':
        setFilter({ jobs: [EJobStatus.NotCreated, EJobStatus.Completed, EJobStatus.Failed] });
        break;
      default:
        break;
    }
  };

  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 gap-6">
      <div className="lg:order-last">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4">
          {statistical?.map((item, index) => (
            <Paper className={cn('p-0 text-center font-semibold cursor-pointer')} key={index}>
              <div className={cn('p-3 text-sm', constants.jobStatus[item.jobStatus].backgroundColor)}>
                {constants.jobStatus[item.jobStatus].label}
              </div>
              <div className="p-3 text-xl">{item.count}</div>
            </Paper>
          ))}
        </div>
      </div>

      <div className="col-span-full">
        <Tabs defaultValue="1" value={tab} onValueChange={handleChangeTab}>
          <TabsList className="grid w-full grid-cols-5 *:flex *:max-lg:flex-col *:items-center *:gap-2">
            <TabsTrigger value="1" className="flex items-center gap-2 py-2">
              <FaUserPlus />
              <span className="max-md:sr-only">Lời mời tham gia</span>
            </TabsTrigger>
            <TabsTrigger value="2" className="flex items-center gap-2 py-2">
              <FaSuitcase />
              <span className="max-md:sr-only">Đề nghị của bạn</span>
            </TabsTrigger>
            <TabsTrigger value="3" className="flex items-center gap-2 py-2">
              <FaHandshake />
              <span className="max-md:sr-only">Đã chấp thuận</span>
            </TabsTrigger>
            <TabsTrigger value="4" className="flex items-center gap-2 py-2">
              <FaChartSimple />
              <span className="max-md:sr-only">Đang thực hiện</span>
            </TabsTrigger>
            <TabsTrigger value="5" className="flex items-center gap-2 py-2">
              <RiCalendarScheduleFill />
              <span className="max-md:sr-only">Công việc đã qua</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
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
