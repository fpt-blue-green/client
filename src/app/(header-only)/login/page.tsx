'use client';

import LoginForm from './login-form';

const Login = () => {
  return (
    <div className="max-w-sm w-full py-10">
      <h1 className="text-center font-bold text-3xl mb-10">Chào mừng trở lại</h1>
      <div className="flex items-center gap-4 my-8 w-full">
        <div className="border-t flex-1"></div>
        <span className="text-sm text-muted-foreground">hoặc</span>
        <div className="border-t flex-1"></div>
      </div>
      <LoginForm />
    </div>
  );
};

export default Login;
