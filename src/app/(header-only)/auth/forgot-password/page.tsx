import { Metadata } from 'next';
import config from '@/config';
import Link from 'next/link';
import ForgotForm from './forgot-form';

export const metadata: Metadata = {
  title: 'Quên mật khẩu',
  description: 'Lấy lại mật khẩu',
};

const ResetPassword = () => {
  return (
    <div className="max-w-sm w-full mt-20">
      <h1 className="text-center font-bold text-3xl mb-10">Quên mật khẩu</h1>
      <ForgotForm />
      <p className="mt-6 text-center text-sm text-muted-foreground ">
        Thử lại lần nữa?
        <Link href={config.routes.login} className="ml-1 hover:underline">
          Đăng nhập
        </Link>
      </p>
    </div>
  );
};

export default ResetPassword;
