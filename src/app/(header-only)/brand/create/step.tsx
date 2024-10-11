'use client';

import { fetcher } from '@/lib/http';
import IInfluencer from '@/types/influencer';
import { FC, memo } from 'react';
import useSWRImmutable from 'swr/immutable';
import DetailStepProps from './step/props';
import { stepPages } from './page';
import { useRouter } from 'next/navigation';
import config from '@/config';
import IBrand from '@/types/brand';

interface StepProps {
  step: number;
  Element: FC<DetailStepProps>;
}

const defaultProfile: IBrand = {
  id: '',
  avatar: '',
  userId: '',
  name: '',
  address: '',
  isPremium: false,
};

const checkStep = (step: number, influencer: IInfluencer): number => {
  if (step === 1 || !influencer) {
    return 1;
  }

  const value = influencer[stepPages[step - 1].checkKey];
  if ((Array.isArray(value) && value.length === 0) || !value) return checkStep(step - 1, influencer);
  else return step;
};

const Step: FC<StepProps> = ({ Element, step }) => {
  const { data: profile, isLoading, mutate } = useSWRImmutable<IBrand>('/Brand', fetcher);
  const router = useRouter();

  return <Element profile={profile || defaultProfile} mutate={mutate} />;
};

export default memo(Step);
