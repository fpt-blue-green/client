import EmailVerificationForm from './email-verification-form';
import VerificationGuidanceModal from './verification-guidance-modal';

const EmailVerification = () => {
  return (
    <div className="max-w-lg mt-24 text-start ">
      <h1 className="font-semibold text-3xl mb-5">Xác thực email của bạn</h1>
      <p className="text-sm text-muted-foreground mb-4">
        Chúng tôi đã gửi tin nhắn xác nhận đến email trandinhhieu@gmail.com. Kiểm tra hộp thư của bạn và nhập mã code 6
        con số để xác thực email.
      </p>
      <EmailVerificationForm />
      <VerificationGuidanceModal />
    </div>
  );
};

export default EmailVerification;
