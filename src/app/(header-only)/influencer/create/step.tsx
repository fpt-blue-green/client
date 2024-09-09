'use client';

import { fetcher } from '@/lib/http';
import IInfluencer from '@/types/influencer';
import { FC, memo } from 'react';
import useSWRImmutable from 'swr/immutable';
import DetailStepProps from './step/props';
import { EGender } from '@/types/enum';

interface StepProps {
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

const Step: FC<StepProps> = ({ Element }) => {
  const { data: profile, isLoading, mutate } = useSWRImmutable<IInfluencer>('/Influencer', fetcher);

  return <>{!isLoading && <Element profile={profile ? profile : defaultProfile} mutate={mutate} />}</>;
};

export default memo(Step);
