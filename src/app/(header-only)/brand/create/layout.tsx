import { Metadata } from 'next';
import { FC, ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Tạo thông tin của nhãn hàng',
  description: 'Nhập thông tin chi tiết để người dùng có thể tìm hiểu thêm về thương hiệu của bạn',
};

interface CreateLayoutProps {
  children: ReactNode;
}

const CreateLayout: FC<CreateLayoutProps> = ({ children }) => {
  return <div className="w-full max-w-3xl my-8">{children}</div>;
};

export default CreateLayout;
