'use client';

import { fetcher } from '@/lib/http';
import IInfluencer from '@/types/influencer';
import { FC, memo } from 'react';
import useSWRImmutable from 'swr/immutable';
import DetailStepProps from './step/props';

interface StepProps {
  Element: FC<DetailStepProps>;
}

const Step: FC<StepProps> = ({ Element }) => {
  const { data: profile, isLoading, mutate } = useSWRImmutable<IInfluencer>('/Influencer', fetcher);

  return <>{profile && !isLoading && <Element profile={profile} mutate={mutate} />}</>;
};

export default memo(Step);
