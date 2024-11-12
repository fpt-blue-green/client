'use client';

import Paper from '@/components/custom/paper';
import { Button } from '@/components/ui/button';
import { useAuthInfluencer } from '@/hooks';
import { cn, constants } from '@/lib/utils';
import { fetchRequest } from '@/request';
import { ECampaignStatus, EJobStatus, EOfferStatus, ERole, PlatformData } from '@/types/enum';
import { useParams } from 'next/navigation';
import JobOffer from '../../influencer/jobs/job-offer';
import Chip from '@/components/custom/chip';
import Badge from '@/components/custom/badge';

const MyJobs = () => {
  const { profile } = useAuthInfluencer();

  return <>{profile && <JobsList />}</>;
};

const JobsList = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = fetchRequest.influencer.jobs([], [], undefined, id);

  return (
    <>
      {data && data.items.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-6">Công việc của bạn</h3>
          <div className="space-y-6">
            {data.items.map((job) => {
              const test = constants.offerStatus[job.offer.status];

              return (
                <div key={job.id} className="grid md:grid-cols-9 grid-cols-1 items-center justify-center gap-2">
                  <span className="md:col-span-2">
                    {job.offer.quantity} {PlatformData[job.offer.platform].contentTypes[job.offer.contentType]}
                  </span>
                  <Paper className="flex flex-col items-center p-2 gap-2 font-semibold">
                    Đề nghị
                    <Badge dot invisible={job.offer.status !== EOfferStatus.Offering || job.offer.from !== ERole.Brand}>
                      <JobOffer campaign={job.campaign} offer={job.offer}>
                        <Chip size="large" className="text-sm" label={test.label} variant={test.color} />
                      </JobOffer>
                    </Badge>
                  </Paper>
                  <div className="md:col-span-2">
                    <div
                      className={cn('md:h-1 md:w-full w-1 h-16 mx-auto bg-secondary', {
                        'bg-success': job.offer.status === EOfferStatus.Done,
                      })}
                    ></div>
                  </div>
                  <Paper
                    className={cn('flex flex-col items-center p-2 gap-2 font-semibold opacity-50 pointer-events-none', {
                      'opacity-100 pointer-events-auto': job.offer.status === EOfferStatus.Done,
                    })}
                  >
                    Bài đăng
                    {job.campaign.status === ECampaignStatus.Active ? (
                      <Button variant="secondary" disabled={job.status !== EJobStatus.InProgress}>
                        Gửi bài
                      </Button>
                    ) : (
                      <Chip label="Hoàn thành" variant="success" size="large" className="text-sm" />
                    )}
                  </Paper>
                  <div className="md:col-span-2">
                    <div
                      className={cn('mx-auto md:h-1 md:w-full w-1 h-16 bg-secondary', {
                        'bg-success':
                          job.offer.status === EOfferStatus.Done && job.campaign.status === ECampaignStatus.Completed,
                      })}
                    ></div>
                  </div>
                  <Paper
                    className={cn('flex flex-col items-center p-2 gap-2 font-semibold opacity-50 pointer-events-none', {
                      'opacity-100 pointer-events-auto':
                        job.offer.status === EOfferStatus.Done && job.campaign.status === ECampaignStatus.Completed,
                    })}
                  >
                    Kết quả
                    {job.status === EJobStatus.Completed && (
                      <Chip label="Hoàn thành" variant="success" size="large" className="text-sm" />
                    )}
                    {job.status === EJobStatus.Failed && (
                      <Chip label="Thất bại" variant="destructive" size="large" className="text-sm" />
                    )}
                    {![EJobStatus.Completed, EJobStatus.Failed].includes(job.status) && (
                      <Chip label="Chưa có" variant="secondary" size="large" className="text-sm" />
                    )}
                  </Paper>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default MyJobs;
