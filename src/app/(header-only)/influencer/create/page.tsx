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
import IInfluencer from '@/types/influencer';

interface CreateProps {
  searchParams?: { step: number };
}

const Create: FC<CreateProps> = async ({ searchParams }) => {
  try {
    if (searchParams) {
      const { step } = searchParams;

      const page = stepPages[step];
      if (page) {
        return (
          <div className="space-y-10">
            <Progress value={(100 * step) / Object.keys(stepPages).length} className="h-3" />
            {step > 1 && (
              <Button variant="secondary" className="rounded-full self-start" startIcon={<ArrowLeftIcon />} asChild>
                <Link href={config.routes.influencer.create(step - 1)}>Trở lại</Link>
              </Button>
            )}
            <h1 className="text-3xl font-semibold">{page.title}</h1>
            <Step Element={page.component} step={step} />
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

export default Create;
