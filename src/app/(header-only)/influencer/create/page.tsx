import { notFound } from 'next/navigation';
import { FC } from 'react';
import Step1 from './step/step1';
import Step2 from './step/step2';
import Step3 from './step/step3';
import Step4 from './step/step4';
import Step5 from './step/step5';
import Step6 from './step/step6';
import Step7 from './step/step7';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import config from '@/config';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import Step from './step';
import DetailStepProps from './step/props';

interface CreateProps {
  searchParams?: {
    step?: string;
    [key: string]: string | string[] | undefined;
  };
}

const Create: FC<CreateProps> = async ({ searchParams }) => {
  if (searchParams) {
    const { step } = searchParams;
    if (step) {
      const stepNum = +step;
      const page = stepPages[stepNum];
      if (page) {
        return (
          <div className="space-y-10">
            <Progress value={(100 * stepNum) / Object.keys(stepPages).length} className="h-3" />
            {stepNum > 1 && (
              <Button variant="secondary" className="rounded-full self-start" startIcon={<ArrowLeftIcon />} asChild>
                <Link href={{ pathname: config.routes.influencer.create, query: { step: stepNum - 1 } }}>Trở lại</Link>
              </Button>
            )}
            <h1 className="text-3xl font-semibold">{page.title}</h1>
            <Step Element={page.component} />
          </div>
        );
      }
    }
  }

  return notFound();
};

const stepPages: { [key: number]: { title: string; component: FC<DetailStepProps> } } = {
  1: {
    title: 'Thông tin cơ bản của bạn',
    component: Step1,
  },
  2: {
    title: 'Ảnh đại diện',
    component: Step2,
  },
  3: {
    title: 'Thêm các trang mạng xã hội của bạn',
    component: Step3,
  },
  4: {
    title: 'Chọn các thẻ phù hợp với nội dung của bạn',
    component: Step4,
  },
  5: {
    title: 'Thêm 3 - 10 ảnh về bạn và nội dụng của bạn',
    component: Step5,
  },
  6: {
    title: 'Thêm vào các gói nội dung',
    component: Step6,
  },
  7: {
    title: 'Thêm số điện thoại để nhận thông báo khi bạn có lời đề nghị',
    component: Step7,
  },
};

export default Create;
