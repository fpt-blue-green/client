'use client';

import IInfluencer from '@/types/influencer';
import { FC, memo, useLayoutEffect } from 'react';
import DetailStepProps from './step/props';
import { EGender } from '@/types/enum';
import { notFound, useRouter, useSearchParams } from 'next/navigation';
import config from '@/config';
import Step1 from './step/step1';
import Step2 from './step/step2';
import Step3 from './step/step3';
import Step4 from './step/step4';
import Step5 from './step/step5';
import Step6 from './step/step6';
import Step7 from './step/step7';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { useAuthInfluencer } from '@/hooks';

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

const Step = () => {
  const { profile, isLoading, refreshProfile } = useAuthInfluencer();
  const searchParams = useSearchParams();
  const router = useRouter();

  const step = searchParams.get('step');
  const stepNum = +(step || 1);
  const { title, component: Element } = stepPages[stepNum];

  useLayoutEffect(() => {
    if (stepNum > 1 && !isLoading) {
      if (profile?.isPublish) {
        router.push(config.routes.home);
      } else {
        const checkedStep = checkStep(stepNum, profile || defaultProfile);
        if (checkedStep !== stepNum) {
          router.push(config.routes.influencer.create(checkedStep));
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, isLoading]);

  if (!step) return notFound();

  return (
    <>
      <div className="space-y-10">
        <Progress value={(100 * stepNum) / Object.keys(stepPages).length} className="h-3" />
        {stepNum > 1 && (
          <Button variant="secondary" className="rounded-full self-start" startIcon={<ArrowLeftIcon />} asChild>
            <Link href={config.routes.influencer.create(stepNum - 1)}>Trở lại</Link>
          </Button>
        )}
        <h1 className="text-3xl font-semibold">{title}</h1>
        {!isLoading && <Element profile={profile || defaultProfile} mutate={refreshProfile} />}
      </div>
    </>
  );
};

export const stepPages: {
  [key: number]: { title: string; component: FC<DetailStepProps>; checkKey: keyof IInfluencer };
} = {
  1: {
    title: 'Thông tin cơ bản của bạn',
    component: Step1,
    checkKey: 'slug',
  },
  2: {
    title: 'Ảnh đại diện',
    component: Step2,
    checkKey: 'avatar',
  },
  3: {
    title: 'Thêm các trang mạng xã hội của bạn',
    component: Step3,
    checkKey: 'channels',
  },
  4: {
    title: 'Chọn các thẻ phù hợp với nội dung của bạn',
    component: Step4,
    checkKey: 'tags',
  },
  5: {
    title: 'Thêm 3 - 10 ảnh về bạn và nội dụng của bạn',
    component: Step5,
    checkKey: 'images',
  },
  6: {
    title: 'Thêm vào các gói nội dung',
    component: Step6,
    checkKey: 'packages',
  },
  7: {
    title: 'Thêm số điện thoại để nhận thông báo khi bạn có lời đề nghị',
    component: Step7,
    checkKey: 'phone',
  },
};

export default memo(Step);
