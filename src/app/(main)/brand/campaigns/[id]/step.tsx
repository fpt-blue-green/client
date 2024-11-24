'use client';

import { FC, useLayoutEffect } from 'react';
import DetailStepProps from './step/props';
import ICampaign from '@/types/campaign';
import StepGeneral from './step/step-general';
import Step1 from './step/step1';
import Step2 from './step/step2';
import Step3 from './step/step3';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { notFound, useRouter, useSearchParams } from 'next/navigation';
import config from '@/config';
import { fetchRequest } from '@/request';
import { ECampaignStatus } from '@/types/enum';

interface StepProps {
  id: string;
}

const checkStep = (step: number, campaign: ICampaign): number => {
  if (campaign.status !== ECampaignStatus.Draft && campaign.status !== ECampaignStatus.Published) {
    return 0;
  }

  if (step === 1) {
    return 1;
  }

  const value = campaign[stepPages[step - 1].checkKey];
  if ((Array.isArray(value) && value.length === 0) || !value) return checkStep(step - 1, campaign);
  else return step;
};

const Step: FC<StepProps> = ({ id }) => {
  const { data, isLoading, mutate } = fetchRequest.campaign.getById(id);
  const searchParams = useSearchParams();
  const step = searchParams.get('step');
  const router = useRouter();

  useLayoutEffect(() => {
    if (id && !isLoading && data) {
      const checkedStep = checkStep(stepNum, data);
      if (checkedStep !== stepNum) {
        if (checkedStep === 0) {
          router.push(config.routes.brand.campaigns.base);
        } else {
          router.push(config.routes.brand.campaigns.edit(id, checkedStep));
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, id, isLoading, step]);

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
        {((!isLoading && data) || (id === 'new' && step === '1')) && (
          <Element id={id} campaign={data} mutate={mutate} />
        )}
      </div>
    </>
  );
};

export const stepPages: {
  [key: string]: { title: string; component: FC<DetailStepProps>; checkKey: keyof ICampaign };
} = {
  1: {
    title: 'Thông tin cơ bản để nhà sáng tạo nội dung có thể tìm kiếm',
    component: StepGeneral,
    checkKey: 'title',
  },
  2: {
    title: 'Danh mục nào mô tả đúng nhất thương hiệu của bạn?',
    component: Step1,
    checkKey: 'tags',
  },
  3: {
    title: 'Thêm ảnh vào cho sản phẩm hoặc dịch vụ của bạn',
    component: Step2,
    checkKey: 'images',
  },
  4: {
    title: 'Những yêu cầu của nội dung và mức giá',
    component: Step3,
    checkKey: 'contents',
  },
};

export default Step;
