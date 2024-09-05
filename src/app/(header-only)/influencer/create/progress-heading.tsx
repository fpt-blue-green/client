import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import config from '@/config';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { FC } from 'react';

const totalStep = 7;

interface ProgressHeadingProps {
  step: number;
  title: string;
}

const ProgressHeading: FC<ProgressHeadingProps> = ({ step, title }) => {
  return (
    <>
      <Progress value={(100 * step) / totalStep} className="h-3" />
      {step > 1 && (
        <Button variant="secondary" className="rounded-full self-start" startIcon={<ArrowLeftIcon />} asChild>
          <Link href={{ pathname: config.routes.influencer.create, query: { step: step - 1 } }}>Trở lại</Link>
        </Button>
      )}
      <h1 className="text-3xl font-semibold">{title}</h1>
    </>
  );
};

export default ProgressHeading;
