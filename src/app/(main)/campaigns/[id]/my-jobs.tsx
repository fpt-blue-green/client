'use client';

import Paper from '@/components/custom/paper';
import { Button } from '@/components/ui/button';
import { useAuthInfluencer } from '@/hooks';
import { cn, constants } from '@/lib/utils';
import { fetchRequest, offerRequest } from '@/request';
import { EJobStatus, EOfferStatus, ERole, PlatformData } from '@/types/enum';
import { useParams } from 'next/navigation';
import JobOffer from '../../influencer/jobs/job-offer';
import Chip from '@/components/custom/chip';
import Badge from '@/components/custom/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Cross2Icon, PlusIcon } from '@radix-ui/react-icons';
import { useFieldArray, useForm } from 'react-hook-form';
import { JobLinksBodyType, jobLinksSchema } from '@/schema-validations/offer.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import IJob from '@/types/job';
import { FC, useState } from 'react';
import { toast } from 'sonner';
import JobStepper from './components/job-stepper';

const MyJobs = () => {
  const { profile } = useAuthInfluencer();

  return <>{profile && <JobsList />}</>;
};

const JobsList = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = fetchRequest.influencer.jobs([], [], undefined, id);
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    setOpen(false);
  };

  return (
    <>
      {data && data.items.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-6">Công việc của bạn</h3>
          <div className="space-y-6">
            {data.items.map((job) => {
              const test = constants.offerStatus[job.offer.status];

              return (
                <JobStepper key={job.id} item={job} />
                // <div key={job.id} className="grid md:grid-cols-9 grid-cols-1 items-center justify-center gap-2">
                //   <span className="md:col-span-2">
                //     {job.offer.quantity} {PlatformData[job.offer.platform].contentTypes[job.offer.contentType]}
                //   </span>
                //   <Paper className="flex flex-col items-center p-2 gap-2 font-semibold">
                //     Đề nghị
                //     <Badge dot invisible={job.offer.status !== EOfferStatus.Offering || job.offer.from !== ERole.Brand}>
                //       <JobOffer campaign={job.campaign} offer={job.offer}>
                //         <Chip size="large" className="text-sm" label={test.label} variant={test.color} />
                //       </JobOffer>
                //     </Badge>
                //   </Paper>
                //   <div className="md:col-span-2">
                //     <div
                //       className={cn('md:h-1 md:w-full w-1 h-16 mx-auto bg-secondary', {
                //         'bg-success': job.offer.status === EOfferStatus.Done,
                //       })}
                //     ></div>
                //   </div>
                //   <Paper
                //     className={cn('flex flex-col items-center p-2 gap-2 font-semibold opacity-50 pointer-events-none', {
                //       'opacity-100 pointer-events-auto': job.offer.status === EOfferStatus.Done,
                //     })}
                //   >
                //     Bài đăng
                //     {job.status === EJobStatus.InProgress ? (
                //       <Dialog open={open} onOpenChange={setOpen}>
                //         <DialogTrigger asChild>
                //           <Button variant="secondary" disabled={job.status !== EJobStatus.InProgress}>
                //             Gửi bài
                //           </Button>
                //         </DialogTrigger>
                //         <DialogContent>
                //           <DialogHeader>
                //             <DialogTitle />
                //             <DialogDescription />
                //             <LinkForm job={job} onSubmit={handleSubmit} />
                //           </DialogHeader>
                //         </DialogContent>
                //       </Dialog>
                //     ) : (
                //       <Chip label="Hoàn thành" variant="success" size="large" className="text-sm" />
                //     )}
                //   </Paper>
                //   <div className="md:col-span-2">
                //     <div
                //       className={cn('mx-auto md:h-1 md:w-full w-1 h-16 bg-secondary', {
                //         'bg-success':
                //           job.offer.status === EOfferStatus.Done &&
                //           [EJobStatus.Completed, EJobStatus.Failed].includes(job.status),
                //       })}
                //     ></div>
                //   </div>
                //   <Paper
                //     className={cn('flex flex-col items-center p-2 gap-2 font-semibold opacity-50 pointer-events-none', {
                //       'opacity-100 pointer-events-auto':
                //         job.offer.status === EOfferStatus.Done &&
                //         [EJobStatus.Completed, EJobStatus.Failed].includes(job.status),
                //     })}
                //   >
                //     Kết quả
                //     {job.status === EJobStatus.Completed && (
                //       <Chip label="Thành công" variant="success" size="large" className="text-sm" />
                //     )}
                //     {job.status === EJobStatus.Failed && (
                //       <Chip label="Thất bại" variant="destructive" size="large" className="text-sm" />
                //     )}
                //     {![EJobStatus.Completed, EJobStatus.Failed].includes(job.status) && (
                //       <Chip label="Chưa có" variant="secondary" size="large" className="text-sm" />
                //     )}
                //   </Paper>
                // </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

interface LinkFormProps {
  job: IJob;
  onSubmit?: () => void;
}

const LinkForm: FC<LinkFormProps> = ({ job, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const { data, mutate } = fetchRequest.job.links(job.id);
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
    setLoading(true);
    if (!values.links.length) {
      toast.error('Vui lòng gửi ít nhất 1 link');
    }
    toast.promise(offerRequest.submitLinks(job.id, values), {
      loading: 'Đang tải',
      success: () => {
        mutate();
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

export default MyJobs;
