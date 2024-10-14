'use client';

import { FC } from 'react';
import DetailStepProps from './step/props';
import useSWRImmutable from 'swr/immutable';
import ICampaign from '@/types/campaign';
import { fetcher } from '@/lib/http';
import Step1 from './step/step1';
import Step2 from './step/step2';
import Step3 from './step/step3';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { notFound, useSearchParams } from 'next/navigation';
import config from '@/config';

interface StepProps {
  id: string;
}

const Step: FC<StepProps> = ({ id }) => {
  const { data, isLoading, mutate } = useSWRImmutable<ICampaign>(`/Campaigns/${id}`, fetcher);
  const searchParams = useSearchParams();
  const step = searchParams.get('step');
  if (!step) return notFound();

  const stepNum = +step;
  const { title, component: Element } = stepPages[step];

  return (
    <>
      <div className="w-full max-w-3xl mx-auto my-16 px-4 space-y-10">
        <Progress value={(100 * stepNum) / Object.keys(stepPages).length} className="h-3" />
        {stepNum > 1 && (
          <Button variant="secondary" className="rounded-full self-start" startIcon={<ArrowLeftIcon />} asChild>
            <Link href={config.routes.brand.campaigns.edit(id, stepNum - 1)}>Trở lại</Link>
          </Button>
        )}
        <h1 className="text-3xl font-semibold">{title}</h1>
        {!isLoading && data && <Element id={id} campaign={data} mutate={mutate} />}
      </div>
    </>
  );
};

export const stepPages: {
  [key: string]: { title: string; component: FC<DetailStepProps> };
} = {
  1: {
    title: 'Danh mục nào mô tả đúng nhất thương hiệu của bạn?',
    component: Step1,
  },
  2: {
    title: 'Thêm ảnh vào cho sản phẩm hoặc dịch vụ của bạn',
    component: Step2,
  },
  3: {
    title: 'Những yêu cầu của nội dung và mức giá',
    component: Step3,
  },
};

export default Step;
