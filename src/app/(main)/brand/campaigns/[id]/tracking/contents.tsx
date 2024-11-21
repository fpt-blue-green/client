'use client';

import Paper from '@/components/custom/paper';
import { fetchRequest } from '@/request';
import { EJobStatus, EOfferStatus } from '@/types/enum';
import { useParams, useSearchParams } from 'next/navigation';
import InfluencerAccordion from './components/influencer-accordion';
import { Accordion } from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import NoData from '@/components/no-data';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Statistical from './components/statistical';

const Contents = () => {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const selected = searchParams.get('selected');
  const { data, isLoading } = fetchRequest.campaign.members(
    id,
    [EJobStatus.Approved, EJobStatus.InProgress],
    [EOfferStatus.Done],
  );
  const { data: links } = fetchRequest.job.links(selected || '');

  return (
    <div className="grid grid-cols-3 gap-4">
      <Paper>
        <Accordion type="multiple">
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => <Skeleton key={index} className="h-16" />)
            : data?.items.map((item) => (
                <InfluencerAccordion key={item.id} item={item} reload={async () => {}} isList />
              ))}
        </Accordion>
      </Paper>
      <Paper className="col-span-2">
        {selected ? (
          <div className="space-y-6">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Chọn một đường dẫn" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Tất cả</SelectItem>
                  {links?.map((link, index) => (
                    <SelectItem key={index} value={link}>
                      {link}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Statistical id={id} />
          </div>
        ) : (
          <NoData description="Vui lòng chọn công việc để hiển thị" />
        )}
      </Paper>
    </div>
  );
};

export default Contents;
