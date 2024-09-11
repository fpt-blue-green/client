'use client';

import { fetcher } from '@/lib/http';
import IInfluencer from '@/types/influencer';
import { FC, memo, useLayoutEffect } from 'react';
import useSWRImmutable from 'swr/immutable';
import DetailStepProps from './step/props';
import { EGender } from '@/types/enum';
import { stepPages } from './page';
import { useRouter } from 'next/navigation';
import config from '@/config';

interface StepProps {
  step: number;
  Element: FC<DetailStepProps>;
}

const defaultProfile: IInfluencer = {
  id: '',
  avatar: '',
  address: '',
  averagePrice: 0,
  fullName: '',
  gender: EGender.Male,
  isPublish: false,
  nickName: '',
  phone: '',
  rateAverage: 0,
  slug: '',
  summarise: '',
  userId: '',
  tags: [],
  images: [],
  channels: [],
  packages: [],
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
  const { data: profile, isLoading, mutate } = useSWRImmutable<IInfluencer>('/Influencer', fetcher);
  const router = useRouter();

  useLayoutEffect(() => {
    if (step > 1 && !isLoading) {
      const checkedStep = checkStep(step, profile || defaultProfile);
      if (checkedStep !== step) {
        router.push(config.routes.influencer.create(checkedStep));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, isLoading]);

  return <>{!isLoading && <Element profile={profile ? profile : defaultProfile} mutate={mutate} />}</>;
};

export default memo(Step);
