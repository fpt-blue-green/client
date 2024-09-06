import { FC, ReactNode } from 'react';

interface CreateLayoutProps {
  children: ReactNode;
}

const CreateLayout: FC<CreateLayoutProps> = ({ children }) => {
  return <div className="w-full max-w-3xl my-8">{children}</div>;
};

export default CreateLayout;