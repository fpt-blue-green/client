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
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { EyeOpenIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import Tooltip from '@/components/custom/tooltip';

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
  const [link, setLink] = useState('all');

  return (
    <div className="grid grid-cols-3 gap-4">
      <Paper>
        <Accordion type="multiple">
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => <Skeleton key={index} className="h-16 mt-4" />)
            : data?.items.map((item) => (
                <InfluencerAccordion key={item.id} item={item} reload={async () => {}} isList />
              ))}
        </Accordion>
      </Paper>
      <Paper className="col-span-2">
        {selected ? (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Select value={link} onValueChange={(v) => setLink(v)}>
                <SelectTrigger className="flex-1">
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
              {link !== 'all' && (
                <Tooltip label="Xem bài đăng">
                  <Button variant="outline" size="icon" asChild>
                    <Link target="_blank" href={link}>
                      <EyeOpenIcon />
                    </Link>
                  </Button>
                </Tooltip>
              )}
            </div>
            <Statistical id={id} jobId={selected} link={link === 'all' ? undefined : link} />
          </div>
        ) : (
          <NoData description="Vui lòng chọn công việc để hiển thị" />
        )}
      </Paper>
    </div>
  );
};

export default Contents;
