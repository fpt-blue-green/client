'use client';
import VerificationGuidanceModal from './verification-guidance-modal';
import { LuMailCheck } from 'react-icons/lu';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const EmailVerification = () => {
  const useParams = useSearchParams();
  const email = useParams.get('email');

  return (
    <div className="max-w-2xl mt-24 space-y-10 flex flex-col items-center">
      <div className="w-20 h-20 bg-gradient rounded-full flex items-center justify-center">
        <LuMailCheck className="text-primary-foreground" size={30} />
      </div>
      <div>
        <h1 className="font-semibold text-3xl mb-5 text-center">Vui lòng xác thực email của bạn</h1>
        <p className="px-8 text-center mt-4">
          Bạn đăng ký gần xong rồi! Chúng tôi đã gửi một tin nhắn đến <span className="font-semibold">{email}</span>
        </p>
      </div>
      <p className="text-center">
        Hãy đến{' '}
        <Link className="text-muted-foreground underline" href="">
          hòm thư
        </Link>{' '}
        của bạn để hoàn thành việc đăng ký tài khoản. Nếu gặp vấn đề với việc xác thực, bạn có lẽ cần đọc{' '}
        <span className="font-semibold">hướng dẫn</span> bên dưới.
      </p>
      <p className="px-8 text-center mt-4">Vẫn chưa xác thực được? Đừng lo. </p>
      <VerificationGuidanceModal />
    </div>
  );
};

export default EmailVerification;
