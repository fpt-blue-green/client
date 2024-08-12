import { GoogleLoginButton } from '@/contexts/google-oauth-provider';
import React from 'react';
import RegisterForm from './register-form';

const Register = () => {
  return (
    <div className="max-w-sm w-full mt-16 ">
      <h1 className="text-3xl font-bold text-center text-gradient mb-10">Tạo Tài Khoản</h1>
      <GoogleLoginButton />
      <div className="flex items-center gap-4 my-8 w-full">
        <div className="border-t flex-1"></div>
        <span className="text-sm text-muted-foreground">hoặc</span>
        <div className="border-t flex-1"></div>
      </div>
      <RegisterForm />
      <p className=" text-[8px] mt-6 text-gray-400 text-center">
        Thông qua việc đăng ký, bạn đồng ý với những <span className="font-bold"> Điều Lệ </span> và{' '}
        <span className="font-bold">Chính Sách Bảo Mật</span> của chúng tôi.
      </p>
    </div>
  );
};

export default Register;
