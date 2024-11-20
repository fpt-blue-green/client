'use client';

import Chip from '@/components/custom/chip';
import Paper from '@/components/custom/paper';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { constants, emitter, formats } from '@/lib/utils';
import { fetchRequest, offerRequest } from '@/request';
import { EOfferStatus, ERole, PlatformData } from '@/types/enum';
import IInfluencerJobs from '@/types/influencer-jobs';
import IJob from '@/types/job';
import { CheckIcon, Cross2Icon, DotsHorizontalIcon, ResetIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { FC, useState } from 'react';
import { FaReply } from 'react-icons/fa6';
import { toast } from 'sonner';
import JobOffer from './job-offer';
import Link from 'next/link';
import config from '@/config';
import { Toggle } from '@/components/ui/toggle';
import { useSearchParams } from 'next/navigation';

interface InfluencerAccordionProps {
  item: IInfluencerJobs;
  reload: () => Promise<void>;
  isList?: boolean;
}

const InfluencerAccordion: FC<InfluencerAccordionProps> = ({ item, isList, reload }) => {
  const searchParams = useSearchParams();

  return (
    <AccordionItem value={item.id}>
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
        {isList ? (
          <div className="flex flex-col -mx-6">
            {item.jobs.map((job) => {
              const { logo, name, contentTypes } = PlatformData[job.offer.platform];

              return (
                <Toggle
                  key={job.id}
                  asChild
                  className="justify-start"
                  pressed={searchParams.get('selected') === job.id}
                >
                  <Link href={`?tab=content&selected=${job.id}`} className="flex items-center gap-2 capitalize">
                    <Image src={logo} alt={name} width={24} height={24} />
                    {job.offer.quantity} {contentTypes[job.offer.contentType]}
                  </Link>
                </Toggle>
              );
            })}
          </div>
        ) : (
          <Paper>
            <Table className="text-center">
              <TableHeader>
                <TableRow>
                  <TableHead>Loại nội dung</TableHead>
                  <TableHead className="text-center">Số lượng</TableHead>
                  <TableHead className="text-center">Giá</TableHead>
                  <TableHead className="text-center">Lượt tương tác</TableHead>
                  <TableHead className="text-center">Thời lượng</TableHead>
                  <TableHead className="text-center">Trạng thái</TableHead>
                  <TableHead className="text-center">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {item.jobs.map((job) => {
                  const { logo, name, contentTypes } = PlatformData[job.offer.platform];
                  const { label, color } = constants.offerStatus[job.offer.status];

                  return (
                    <TableRow key={job.id}>
                      <TableCell>
                        <div className="flex items-center gap-2 capitalize">
                          <Image src={logo} alt={name} width={32} height={32} />
                          {contentTypes[job.offer.contentType]}
                        </div>
                      </TableCell>
                      <TableCell>{job.offer.quantity}</TableCell>
                      <TableCell>{formats.price(job.offer.price)}</TableCell>
                      <TableCell title={formats.bigNum(job.offer.targetReaction)}>
                        {formats.estimate(job.offer.targetReaction)}
                      </TableCell>
                      <TableCell>{job.offer.duration}</TableCell>
                      <TableCell>
                        <JobOffer offer={job.offer} reload={reload}>
                          <Chip
                            label={label}
                            variant={color}
                            icon={job.offer.from === ERole.Brand ? <FaReply /> : undefined}
                          />
                        </JobOffer>
                      </TableCell>
                      <TableCell>
                        <OfferAction job={job} reload={reload} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};

const OfferAction = ({ job, reload }: { job: IJob; reload: () => Promise<void> }) => {
  const { offer } = job;
  const [open, setOpen] = useState(false);
  const { mutate: mutatePayment } = fetchRequest.user.payment(true);
  const { mutate } = fetchRequest.user.paymentHistory();

  const handleResponseOffer = (id: string, accept: boolean) => () => {
    setOpen(false);
    emitter.confirm({
      content: `Bạn có chắc sẽ ${accept ? 'đồng ý' : 'từ chối'} lời đề nghị này không?`,
      callback: () => {
        const caller = accept ? offerRequest.approveOffer(id) : offerRequest.rejectOffer(id);
        toast.promise(caller, {
          loading: 'Đang tải',
          success: () => {
            reload();
            mutatePayment();
            mutate();
            return `Lời đề nghị đã được ${accept ? 'chấp thuận' : 'từ chối'}`;
          },
          error: (err) => err?.message || constants.sthWentWrong,
        });
      },
    });
  };

  const handlePayment = () => {
    emitter.confirm({
      content: 'Bạn có chắc sẽ thanh toán đặt cọc lời đề nghị này không?',
      callback: () => {
        toast.promise(offerRequest.payOffer(job.id), {
          loading: 'Đang tải',
          success: async () => {
            await reload();

            return 'Lời đề nghị đã được đặt cọc thành công';
          },
          error: (err) => {
            const msg = err?.message || constants.sthWentWrong;
            return (
              <div>
                {msg} Nạp tiền{' '}
                <Link href={config.routes.account} className="font-semibold underline">
                  tại đây
                </Link>
              </div>
            );
          },
        });
      },
    });
  };

  if (offer.status === EOfferStatus.WaitingPayment) {
    return (
      <Button variant="outline" size="small" onClick={handlePayment}>
        Thanh toán
      </Button>
    );
  }

  if (offer.status === EOfferStatus.Done) {
    return (
      <Button variant="outline" size="small">
        Xem chi tiết
      </Button>
    );
  }

  if (offer.status === EOfferStatus.Offering && offer.from === ERole.Influencer) {
    return (
      <DropdownMenu open={open}>
        <DropdownMenuTrigger asChild>
          <Button size="icon-sm" variant="outline" onClick={() => setOpen(true)}>
            <DotsHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" onInteractOutside={() => setOpen(false)}>
          <JobOffer offer={offer} reload={reload}>
            <DropdownMenuItem className="flex items-center gap-1">
              <ResetIcon />
              Đề nghị lại
            </DropdownMenuItem>
          </JobOffer>
          <DropdownMenuItem className="flex items-center gap-1" onClick={handleResponseOffer(offer.id, true)}>
            <CheckIcon />
            Chấp nhận
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex items-center gap-1 text-destructive"
            onClick={handleResponseOffer(offer.id, false)}
          >
            <Cross2Icon />
            Từ chối
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return;
};

export default InfluencerAccordion;
