'use client';

import JobOffer from '@/app/(main)/influencer/jobs/job-offer';
import Badge from '@/components/custom/badge';
import Chip from '@/components/custom/chip';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn, constants } from '@/lib/utils';
import { fetchRequest, offerRequest } from '@/request';
import { JobLinksBodyType, jobLinksSchema } from '@/schema-validations/offer.schema';
import { EJobStatus, EOfferStatus, ERole, PlatformData } from '@/types/enum';
import IJob from '@/types/job';
import { zodResolver } from '@hookform/resolvers/zod';
import { Cross2Icon } from '@radix-ui/react-icons';
import { PlusIcon } from 'lucide-react';
import Image from 'next/image';
import { FC, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';

const styles = (active: boolean, isLast = false) => {
  return cn(
    'relative flex flex-col items-center justify-center gap-2 h-24 py-2 pl-8 pr-4 font-semibold bg-accent opacity-50 pointer-events-none',
    {
      'before:absolute before:top-0 before:right-0 before:z-1 before:translate-x-full before:border-l-[24px] before:border-y-[48px] before:border-r-0 before:border-transparent before:border-l-gray-400':
        !isLast,
      'after:absolute after:top-px after:right-0 after:z-1 after:translate-x-full after:border-l-[23px] after:border-y-[47px] after:border-r-0 after:border-transparent after:border-l-accent':
        !isLast,
      'opacity-100 pointer-events-auto': active,
    },
  );
};

const JobStepper = ({ item }: { item: IJob }) => {
  const offerStatus = constants.offerStatus[item.offer.status];
  const { data, mutate } = fetchRequest.job.links(item.id);
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    mutate();
    setOpen(false);
  };

  const isFinish =
    [EJobStatus.Completed, EJobStatus.Failed].includes(item.status) ||
    data?.filter((item) => item.isApprove).length === item.offer.quantity;

  return (
    <div className="grid md:grid-cols-5 items-center gap-4">
      <div className="font-medium">{`${item.offer.quantity} ${
        PlatformData[item.offer.platform].contentTypes[item.offer.contentType]
      }`}</div>
      <div className="md:col-span-4 grid grid-cols-3">
        <div className={styles(true)}>
          <div>1. Đề nghị</div>
          <Badge dot invisible={item.offer.status !== EOfferStatus.Offering || item.offer.from !== ERole.Brand}>
            <JobOffer campaign={item.campaign} offer={item.offer}>
              <Chip size="large" className="text-sm" label={offerStatus.label} variant={offerStatus.color} />
            </JobOffer>
          </Badge>
        </div>
        <div className={styles(item.offer.status === EOfferStatus.Done)}>
          <div>2. Gửi bài</div>
          {!isFinish ? (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" disabled={item.status !== EJobStatus.InProgress}>
                  Gửi bài
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle />
                  <DialogDescription />
                  <LinkForm job={item} onSubmit={handleSubmit} data={data} />
                </DialogHeader>
              </DialogContent>
            </Dialog>
          ) : (
            <Chip label="Hoàn thành" variant="success" size="large" className="text-sm" />
          )}
        </div>
        <div className={styles(isFinish, true)}>
          <div>3. Kết quả</div>
          {item.status === EJobStatus.Completed && (
            <Chip label="Thành công" variant="success" size="large" className="text-sm" />
          )}
          {item.status === EJobStatus.Failed && (
            <Chip label="Thất bại" variant="destructive" size="large" className="text-sm" />
          )}
          {![EJobStatus.Completed, EJobStatus.Failed].includes(item.status) && (
            <Chip label="Chưa có" variant="secondary" size="large" className="text-sm" />
          )}
        </div>
      </div>
    </div>
  );
};

interface LinkFormProps {
  job: IJob;
  data?: { link: string; isApprove: boolean }[];
  onSubmit?: () => void;
}

const LinkForm: FC<LinkFormProps> = ({ job, data, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const form = useForm<JobLinksBodyType>({
    resolver: zodResolver(jobLinksSchema),
    defaultValues: {
      links: data || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'links',
  });

  const addRow = () => {
    append({ link: '', isApprove: false });
  };

  const removeRow = (index: number) => () => {
    remove(index);
  };

  const handleSubmit = (values: JobLinksBodyType) => {
    if (!values.links.length) {
      toast.error('Vui lòng gửi ít nhất 1 link');
      return;
    }
    setLoading(true);
    toast.promise(offerRequest.submitLinks(job.id, values), {
      loading: 'Đang tải',
      success: () => {
        onSubmit?.();
        return 'Đã gửi bài đăng thành công';
      },
      error: (err) => err?.message,
      finally: () => setLoading(false),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Image src="/assets/img/social-bg.png" alt="Mạng xã hội" width={700} height={350} />
        <div className="space-y-3 mb-4">
          {fields.map((field, index) => {
            const isApprove = form.getValues(`links.${index}.isApprove`);
            return (
              <FormField
                key={field.id}
                control={form.control}
                name={`links.${index}.link`}
                render={({ field }) => (
                  <div className="flex items-center gap-2">
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="Nhập đường dẫn liên kết bài đăng của bạn"
                          fullWidth
                          {...field}
                          disabled={form.getValues(`links.${index}.isApprove`)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    {!isApprove && (
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={removeRow(index)}>
                        <Cross2Icon />
                      </Button>
                    )}
                  </div>
                )}
              />
            );
          })}
          {fields.length < job.offer.quantity && (
            <Button variant="ghost" onClick={addRow} startIcon={<PlusIcon />} size="small">
              Thêm link
            </Button>
          )}
        </div>
        <DialogFooter>
          <Button type="submit" variant="gradient" fullWidth loading={loading}>
            Gửi
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default JobStepper;
