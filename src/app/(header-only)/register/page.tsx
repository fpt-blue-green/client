import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import config from '@/config';
import Image from 'next/image';
import Link from 'next/link';

const Register = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full flex justify-start pl-2.5 font-normal" variant="ghost">
          Đăng kí
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl text-center"></DialogTitle>
          <DialogDescription></DialogDescription>
          <div className="max-w-full">
            <div className="flex items-center justify-center">
              <h1 className="font-bold text-7xl">adfusion</h1>
              <Image src="/logo.png" alt="adfusion" className="w-10 h-10" width={200} height={200} />
            </div>
            <h2 className="px-5 pt-10 font-bold text-4xl text-center">Kể Chúng Tôi Nghe Về Bạn</h2>
            <div className="flex flex-col md:flex-row gap-4 justify-center px-5 pt-10 pb-20 ">
              <DialogClose asChild>
                <Button size="large" className="py-5 px-16 h-14" variant="gradient">
                  <Link href={''}>Người Nổi Tiếng</Link>
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button size="large" className="py-5 px-16 h-14" variant="gradient" asChild>
                  <Link href={config.routes.brand.base}> Nhãn Hàng / Đại Lý</Link>
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Register;
