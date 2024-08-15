import { Button } from '@/components/ui/button';
import TypingText from './typing-text';

const JoinAsBrand = () => {
  return (
    <div className="container my-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-semibold">
          Cách dễ dàng để tạo
          <br />
          <TypingText />
        </h1>
        <p className="text-sm text-muted-foreground mt-3 mb-7">
          Tìm những người có ảnh hưởng, chạy chiến dịch và nhận nội dung độc đáo cho thương hiệu của bạn chỉ trong vài
          giây.
        </p>
        <Button size="large" variant="gradient" className="px-12 h-12">
          Bắt đầu miễn phí
        </Button>
      </div>
    </div>
  );
};

export default JoinAsBrand;
