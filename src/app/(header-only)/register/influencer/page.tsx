import { GoogleLoginButton } from '@/contexts/google-oauth-provider';
import RegisterAsInfluencerForm from './register-form';

const RegisterAsInfluencer = () => {
  return (
    <div className="max-w-sm w-full mt-20">
      <h1 className="text-center font-bold text-3xl mb-10 bg-gradient text-gradient">Tạo Tài Khoản Của Bạn</h1>
      <GoogleLoginButton />
      <div className="flex items-center gap-4 my-8 w-full">
        <div className="border-t flex-1"></div>
        <span className="text-sm text-muted-foreground">hoặc</span>
        <div className="border-t flex-1"></div>
      </div>
      <RegisterAsInfluencerForm />
      <p className="text-center text-muted-foreground text-[10px] mt-4">
        Thông qua việc đăng ký, bạn đồng ý với các <span className="font-semibold">Điều Khoản</span> của chúng tôi
      </p>
    </div>
  );
};

export default RegisterAsInfluencer;
