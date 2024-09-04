import { notFound } from 'next/navigation';
import { FC } from 'react';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';

interface CreateProps {
  searchParams?: {
    step?: string;
    [key: string]: string | string[] | undefined;
  };
}

const Create: FC<CreateProps> = ({ searchParams }) => {
  if (searchParams) {
    const { step } = searchParams;
    switch (step) {
      case '1':
        return <Step1 />;
      case '2':
        return <Step2 />;
      case '3':
        return <Step3 />;
      default:
        notFound();
    }
  }

  return notFound();
};

export default Create;
