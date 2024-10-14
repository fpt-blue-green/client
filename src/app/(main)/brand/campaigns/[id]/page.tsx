import { FC } from 'react';
import Step from './step';

interface CreateProps {
  params: { id: string };
  searchParams?: { step: number };
}

const Create: FC<CreateProps> = async ({ params }) => {
  return <Step id={params.id} />;
};

export default Create;
