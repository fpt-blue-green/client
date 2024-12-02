'use client';

import { useAuthInfluencer } from '@/hooks';
import { fetchRequest } from '@/request';
import { useParams } from 'next/navigation';
import JobStepper from './components/job-stepper';

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
            {data.items.map((job) => (
              <JobStepper key={job.id} item={job} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MyJobs;
