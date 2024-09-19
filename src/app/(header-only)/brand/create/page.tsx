import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FC } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import config from '@/config';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import IBrand from '@/types/brand';
import Step from './step';
import DetailStepProps from './step/props';
import Step1 from './step/step1';
import Step2 from './step/step2';

interface CreateProps {
  searchParams?: { step: number };
}

const Create: FC<CreateProps> = ({ searchParams }) => {
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
                <Link href={config.routes.brand.create(step - 1)}>Trở lại</Link>
              </Button>
            )}
            <h1 className="text-3xl font-semibold">{page.title}</h1>
            <p className="text-muted-foreground -mt-4">{page.description}</p>
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
  [key: number]: { title: string; description: string; component: FC<DetailStepProps>; checkKey: keyof IBrand };
} = {
  1: {
    title: 'Thông tin cơ bản của nhãn hàng',
    description:
      'Thông tin này sẽ được hiển thị trên hồ sơ của bạn, nơi người sáng tạo có thể tìm hiểu thêm về thương hiệu của bạn',
    component: Step1,
    checkKey: 'name',
  },
  2: {
    title: 'Thêm các phương tiện truyền thông',
    description:
      'Điều quan trọng là người sáng tạo có thể xem các trang mạng xã hội của bạn trước khi tạo nội dung cho bạn.',
    component: Step2,
    checkKey: 'id',
  },
  3: {
    title: 'Thêm các trang mạng xã hội của bạn',
    description: '',
    component: Step1,
    checkKey: 'id',
  },
};

export default Create;
