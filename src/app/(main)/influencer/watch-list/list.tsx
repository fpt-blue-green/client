'use client';

import { fetchRequest } from '@/request';
import JobCard from './job-card';
import Paper from '@/components/custom/paper';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { constants } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { ECampaignStatus } from '@/types/enum';

const List = () => {
  const { data } = fetchRequest.influencer.jobs();

  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
      <div className="col-span-full">
        <div className="flex items-center gap-4 mb-6">
          <Label required>Trạng thái công việc:</Label>
          <Select>
            <SelectTrigger className="w-52">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              {Object.entries(constants.jobStatus).map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label>Giai đoạn chiến dịch:</Label>
          <Select>
            <SelectTrigger className="w-52">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              {Object.entries(constants.campaignStatus)
                .filter(([key]) => +key !== ECampaignStatus.Draft)
                .map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="lg:order-last">
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-2 gap-4">
          <Paper className="p-0 text-center font-semibold col-span-full md:col-span-1 lg:col-span-full">
            <div className="p-3 text-sm bg-success">Hoàn thành</div>
            <div className="p-3 text-xl">4</div>
          </Paper>
          <Paper className="p-0 text-center font-bold">
            <div className="p-3 text-sm bg-warning">Chờ xác nhận</div>
            <div className="p-3 text-xl">4</div>
          </Paper>
          <Paper className="p-0 text-center font-bold">
            <div className="p-3 text-sm bg-info">Đang thực hiện</div>
            <div className="p-3 text-xl">0</div>
          </Paper>
          <Paper className="p-0 text-center font-bold">
            <div className="p-3 text-sm bg-secondary">Không đạt</div>
            <div className="p-3 text-xl">4</div>
          </Paper>
          <Paper className="p-0 text-center font-bold">
            <div className="p-3 text-sm bg-destructive">Từ chối</div>
            <div className="p-3 text-xl">4</div>
          </Paper>
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
