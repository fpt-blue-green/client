'use client';

import { FC } from 'react';
import DetailStepProps from './step/props';
import useSWRImmutable from 'swr/immutable';
import ICampaign from '@/types/campaign';
import { fetcher } from '@/lib/http';

interface StepProps {
  id: string;
  step: number;
  Element: FC<DetailStepProps>;
}

const Step: FC<StepProps> = ({ id, Element }) => {
  const { data, isLoading, mutate } = useSWRImmutable<ICampaign>(`/Campaigns/${id}`, fetcher);

  return <>{!isLoading && data && <Element id={id} campaign={data} mutate={mutate} />}</>;
};
export default Step;
