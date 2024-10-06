import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import config from '@/config';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FC } from 'react';
import DetailStepProps from './step/props';
import Step from './step';
import Step1 from './step/step1';
import Step2 from './step/step2';
import Step3 from './step/step3';

interface CreateProps {
  params: { id: string };
  searchParams?: { step: number };
}

const Create: FC<CreateProps> = async ({ searchParams, params }) => {
  try {
    if (searchParams) {
      const { step } = searchParams;

      const page = stepPages[step];
      if (page) {
        return (
          <div className="w-full max-w-3xl mx-auto my-16 px-4 space-y-10">
            <Progress value={(100 * step) / Object.keys(stepPages).length} className="h-3" />
            {step > 1 && (
              <Button variant="secondary" className="rounded-full self-start" startIcon={<ArrowLeftIcon />} asChild>
                <Link href={config.routes.brand.campaigns.edit(params.id, step - 1)}>Trở lại</Link>
              </Button>
            )}
            <h1 className="text-3xl font-semibold">{page.title}</h1>
            <Step id={params.id} Element={page.component} step={step} />
          </div>
        );
      }
    }
  } catch (error) {
    return notFound();
  }

  return notFound();
};

export const stepPages: {
  [key: number]: { title: string; component: FC<DetailStepProps> };
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

export default Create;
