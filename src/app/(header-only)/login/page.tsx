import LoginForm from './login-form';
import Link from 'next/link';
import config from '@/config';
import GoogleLogin from './google-login';

const Login = () => {
  return (
    <div className="max-w-sm w-full mt-20">
      <h1 className="text-center font-bold text-3xl mb-10 bg-gradient text-gradient">Chào mừng trở lại</h1>
      <GoogleLogin />
      <div className="flex items-center gap-4 my-8 w-full">
        <div className="border-t flex-1"></div>
        <span className="text-sm text-muted-foreground">hoặc</span>
        <div className="border-t flex-1"></div>
      </div>
      <LoginForm />
      <p className="mt-6 text-center">
        <Link href={config.routes.forgot} className="text-sm text-muted-foreground hover:underline">
          Quên mật khẩu?
        </Link>
      </p>
    </div>
  );
};

export default Login;
