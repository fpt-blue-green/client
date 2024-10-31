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
import { Table, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { constants, emitter, formats } from '@/lib/utils';
import { offerRequest } from '@/request';
import { EOfferStatus, ERole, PlatformData } from '@/types/enum';
import IInfluencerJobs from '@/types/influencer-jobs';
import IJob from '@/types/job';
import { CheckIcon, Cross2Icon, DotsHorizontalIcon, ResetIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { FC } from 'react';
import { FaReply } from 'react-icons/fa6';
import { toast } from 'sonner';

interface InfluencerAccordionProps {
  item: IInfluencerJobs;
  reload: () => Promise<void>;
}

const InfluencerAccordion: FC<InfluencerAccordionProps> = ({ item, reload }) => {
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
                  <TableCell>{job.offer.targetReaction}</TableCell>
                  <TableCell>{job.offer.duration}</TableCell>
                  <TableCell>
                    <Chip
                      label={label}
                      variant={color}
                      icon={job.offer.from === ERole.Brand ? <FaReply /> : undefined}
                    />
                  </TableCell>
                  <TableCell>
                    <OfferAction job={job} reload={reload} />
                  </TableCell>
                </TableRow>
              );
            })}
          </Table>
        </Paper>
      </AccordionContent>
    </AccordionItem>
  );
};

const OfferAction = ({ job, reload }: { job: IJob; reload: () => Promise<void> }) => {
  const { offer } = job;

  const handleResponseOffer = (id: string, accept: boolean) => () => {
    const caller = accept ? offerRequest.approveOffer(id) : offerRequest.rejectOffer(id);
    emitter.confirm({
      content: `Bạn có chắc sẽ ${accept ? 'đồng ý' : 'từ chối'} lời đề nghị này không?`,
      callback: () =>
        toast.promise(caller, {
          loading: 'Đang tải',
          success: () => {
            reload();
            return `Lời đề nghị đã được ${accept ? 'chấp thuận' : 'từ chối'}`;
          },
          error: (err) => err?.message || constants.sthWentWrong,
        }),
    });
  };

  if (offer.status === EOfferStatus.WaitingPayment) {
    return (
      <Button variant="outline" size="small">
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon-sm" variant="outline">
            <DotsHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="flex items-center gap-1">
            <ResetIcon />
            Đề nghị lại
          </DropdownMenuItem>
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
