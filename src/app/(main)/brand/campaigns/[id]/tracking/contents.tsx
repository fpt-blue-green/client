'use client';

import Paper from '@/components/custom/paper';
import { fetchRequest, offerRequest } from '@/request';
import { EJobStatus, EOfferStatus, PlatformData } from '@/types/enum';
import { useParams } from 'next/navigation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import NoData from '@/components/no-data';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Statistical from './components/statistical';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { EyeOpenIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import Tooltip from '@/components/custom/tooltip';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';
import Badge from '@/components/custom/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Toggle } from '@/components/ui/toggle';
import Image from 'next/image';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import IJob from '@/types/job';
import Chip from '@/components/custom/chip';
import { emitter } from '@/lib/utils';

const Contents = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, mutate } = fetchRequest.campaign.members(
    id,
    [EJobStatus.Approved, EJobStatus.InProgress, EJobStatus.Failed, EJobStatus.Completed],
    [EOfferStatus.Done],
  );
  const [selectedJob, setSelectedJob] = useState<IJob>();

  const handleReload = () => {
    mutate();
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      <Paper className="h-[640px]">
        <ScrollArea>
          <Accordion type="multiple">
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => <Skeleton key={index} className="h-16 mt-4" />)
              : data?.items.map((item) => (
                  <AccordionItem value={item.id} key={item.id}>
                    <AccordionTrigger>
                      <div className="flex items-center gap-4">
                        <Avatar className="size-12">
                          <AvatarImage src={item.avatar} alt={`Ảnh đại diện ${item.fullName}`} />
                          <AvatarFallback>{item.fullName[0]}</AvatarFallback>
                        </Avatar>
                        <h6 className="text-lg font-semibold">{item.fullName}</h6>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6">
                      <div className="flex flex-col gap-1 -mx-6">
                        {item.jobs.map((job) => {
                          const { logo, name, contentTypes } = PlatformData[job.offer.platform];

                          return (
                            <Toggle
                              key={job.id}
                              asChild
                              className="justify-start cursor-pointer"
                              pressed={selectedJob?.id === job.id}
                              onPressedChange={() => setSelectedJob(job)}
                            >
                              <div className="flex items-center justify-between gap-2 capitalize">
                                <div className="flex items-center gap-2">
                                  <Image src={logo} alt={name} width={24} height={24} />
                                  {job.offer.quantity} {contentTypes[job.offer.contentType]}
                                </div>
                                {job.status === EJobStatus.Completed && <FaCheckCircle className="text-success" />}
                                {job.status === EJobStatus.Failed && <FaTimesCircle className="text-destructive" />}
                              </div>
                            </Toggle>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
          </Accordion>
        </ScrollArea>
      </Paper>
      <Paper className="col-span-2">
        {selectedJob ? (
          <JobDetails item={selectedJob} reload={handleReload} />
        ) : (
          <NoData description="Vui lòng chọn công việc để hiển thị" className="h-full" />
        )}
      </Paper>
    </div>
  );
};

const JobDetails = ({ item, reload }: { item: IJob; reload: () => void }) => {
  const { id } = useParams<{ id: string }>();
  const { data, mutate } = fetchRequest.job.links(item.id);
  const [link, setLink] = useState('all');

  useEffect(() => {
    setLink('all');
  }, [item.id]);

  const linkObj = useMemo(() => {
    if (data && link !== 'all') {
      const obj = data.find((l) => l.link === link);
      return obj;
    }
  }, [link, data]);

  const numNotApproved = useMemo(() => {
    return data?.filter((l) => !l.isApprove).length;
  }, [data]);

  // const handleComplete = (completed: boolean) => () => {
  //   if (item) {
  //     const caller = completed ? offerRequest.complete(item.id) : offerRequest.fail(item.id);
  //     toast.promise(caller, {
  //       loading: 'Đang tải',
  //       success: () => {
  //         reload();
  //         return 'Thành công';
  //       },
  //       error: (err) => err?.message,
  //     });
  //   }
  // };

  const handleApprove = () => {
    emitter.confirm({
      callback: () => {
        toast.promise(offerRequest.approveLink(item.id, link), {
          loading: 'Đang tải',
          success: () => {
            mutate();
            return 'Bài đăng đã được xác thực.';
          },
          error: (err) => err?.message,
        });
      },
      content: 'Bạn đảm bảo bài đăng đúng tiêu chí đề ra và bắt đầu theo dõi lượt tương tác của bài đăng này?',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Select value={link} onValueChange={(v) => setLink(v)}>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Chọn một đường dẫn" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">
                Tất cả
                {!!numNotApproved && (
                  <Chip label={numNotApproved.toString()} className="ml-2" variant="destructive" size="small" />
                )}
              </SelectItem>
              {data?.map(({ link, isApprove }, index) => (
                <SelectItem key={index} value={link}>
                  <Badge dot={!isApprove}>{link}</Badge>
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
      {linkObj && !linkObj.isApprove ? (
        <div className="p-8 space-y-4 text-center">
          <h4>Link chưa được xác nhận</h4>
          <div className="inline-flex items-center gap-2">
            <Button variant="outline">
              <Link target="_blank" href={linkObj.link}>
                Xem bài đăng
              </Link>
            </Button>
            <Button variant="gradient" onClick={handleApprove}>
              Chấp thuận
            </Button>
          </div>
        </div>
      ) : numNotApproved !== data?.length ? (
        <Statistical id={id} jobId={item.id} link={link === 'all' ? undefined : link} />
      ) : (
        <NoData description="Chưa có bài đăng nào được xác thực" />
      )}
      {/* {item.status === EJobStatus.InProgress && data?.some((l) => l.isApprove) && (
        <div className="grid grid-cols-2 gap-6">
          <Button variant="outline" onClick={handleComplete(false)}>
            Không đạt
          </Button>
          <Button variant="gradient" onClick={handleComplete(true)}>
            Đạt yêu cầu
          </Button>
        </div>
      )} */}
    </div>
  );
};

export default Contents;
