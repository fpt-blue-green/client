import { Button } from '@/components/ui/button';
import config from '@/config';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { Fredoka } from 'next/font/google';
import Link from 'next/link';

const fredoka = Fredoka({ subsets: ['latin'], weight: ['700'] });

const NotFound = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 space-y-6 p-5 text-center w-full max-w-screen-sm">
      <h1 className={clsx(fredoka.className, 'md:text-[168px] text-9xl text-gradient')}>404</h1>
      <h3 className="text-3xl uppercase font-semibold">Oops! Trang không tìm thấy</h3>
      <p className="text-muted-foreground">
        Xin lỗi nhưng trang bạn đang tìm kiếm không tồn tại, đã bị xóa tên hoặc tạm thời không có sẵn.
      </p>
      <Button
        variant="gradient"
        size="large"
        className="py-6 px-12 rounded-full"
        asChild
        startIcon={<ChevronLeftIcon fontSize={20} />}
      >
        <Link href={config.routes.home}>Trở về trang chủ</Link>
      </Button>
    </div>
  );
};

export default NotFound;
