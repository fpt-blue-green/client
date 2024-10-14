'use client';

import { FC, memo } from 'react';
import DetailStepProps from './step/props';
import IBrand from '@/types/brand';
import Step1 from './step/step1';
import Step2 from './step/step2';
import Step3 from './step/step3';
import { useAuthBrand } from '@/hooks';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import config from '@/config';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { notFound, useSearchParams } from 'next/navigation';

interface PageContent {
  title: string;
  description: string;
  component: FC<DetailStepProps>;
  checkKey: keyof IBrand;
}

const defaultProfile: IBrand = {
  id: '',
  avatar: '',
  userId: '',
  name: '',
  address: '',
  isPremium: false,
};

const Step = () => {
  const { profile, isLoading, refreshProfile } = useAuthBrand();
  const searchParams = useSearchParams();
  const step = searchParams.get('step');
  if (!step) return notFound();

  const stepNum = +step;
  const { title, description, component: Element } = stepPages[step];

  return (
    <div className="space-y-10">
      <Progress value={(100 * stepNum) / Object.keys(stepPages).length} className="h-3" />
      {stepNum > 1 && (
        <Button variant="secondary" className="rounded-full self-start" startIcon={<ArrowLeftIcon />} asChild>
          <Link href={config.routes.brand.create(stepNum - 1)}>Trở lại</Link>
        </Button>
      )}
      <h1 className="text-3xl font-semibold">{title}</h1>
      <p className="text-muted-foreground -mt-4">{description}</p>
      {!isLoading && <Element profile={profile || defaultProfile} mutate={refreshProfile} />}
    </div>
  );
};

export const stepPages: {
  [key: string]: PageContent;
} = {
  1: {
    title: 'Thông tin cơ bản của nhãn hàng',
    description:
      'Thông tin này sẽ được hiển thị trên hồ sơ của bạn, nơi người sáng tạo có thể tìm hiểu thêm về thương hiệu của bạn',
    component: Step1,
    checkKey: 'name',
  },
  2: {
    title: 'Thêm ảnh đại diện và ảnh bìa cho nhãn hàng của bạn',
    description: 'Điều này giúp cho các người sáng tạo có thể nhận diện nhãn hàng một cách dễ dàng hơn',
    component: Step2,
    checkKey: 'coverImg',
  },
  3: {
    title: 'Thêm các phương tiện truyền thông',
    description:
      'Điều quan trọng là người sáng tạo có thể xem các trang mạng xã hội của bạn trước khi tạo nội dung cho bạn.',
    component: Step3,
    checkKey: 'id',
  },
};

export default memo(Step);
