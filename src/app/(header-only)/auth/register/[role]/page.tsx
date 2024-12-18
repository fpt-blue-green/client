import Link from 'next/link';
import RegisterForm from './register-form';
import config from '@/config';
import GoogleLogin from '../../components/google-login';
import FacebookLogin from '../../components/facebook-login';
import { FC } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface RegisterProps {
  params: { role: string };
}

export async function generateMetadata({ params }: RegisterProps): Promise<Metadata> {
  const { role } = params;

  const metadata = {
    title: role === 'influencer' ? 'Tạo tài khoản cho nhà sáng tạo' : 'Tạo tài khoản cho nhãn hàng',
    description: 'Tạo tài khoản mới để trở thành thành viên của adfusion',
  };

  return metadata;
}

const Register: FC<RegisterProps> = ({ params }) => {
  const { role } = params;
  if (role !== 'influencer' && role !== 'brand') {
    return notFound();
  }

  return (
    <div className="max-w-sm w-full mt-20">
      <h1 className="text-center font-bold text-3xl mb-10 bg-gradient text-gradient">Tạo Tài Khoản Của Bạn</h1>
      <div className="space-y-4">
        <GoogleLogin method="sign-up" role={role} />
        <FacebookLogin method="sign-up" role={role} />
      </div>
      <div className="flex items-center gap-4 my-8 w-full">
        <div className="border-t flex-1"></div>
        <span className="text-sm text-muted-foreground">hoặc</span>
        <div className="border-t flex-1"></div>
      </div>
      <RegisterForm role={role} />
      <p className="text-center text-muted-foreground text-[10px] mt-4">
        Thông qua việc đăng ký, bạn đồng ý với các
        <br />
        <Link className="font-semibold" href="">
          Điều Khoản
        </Link>{' '}
        và{' '}
        <Link className="font-semibold" href="">
          Chính Sách Bảo Mật
        </Link>{' '}
        của chúng tôi.
      </p>
      <p className="text-center text-sm mt-7 text-muted-foreground mr-1">
        Đã có tài khoản?
        <Link className="font-semibold ml-1 hover:underline" href={config.routes.login}>
          Đăng nhập
        </Link>
      </p>
    </div>
  );
};

export function generateStaticParams() {
  return [{ role: 'influencer' }, { role: 'brand' }];
}

export default Register;
