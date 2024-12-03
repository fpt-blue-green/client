import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DesktopIcon, LockClosedIcon } from '@radix-ui/react-icons';
import { LuCreditCard } from 'react-icons/lu';
import Security from './security';
import Payment from './payment';
import { Metadata } from 'next';
import Link from 'next/link';
import Devices from './devices';

export const metadata: Metadata = {
  title: 'Tài khoản',
  description: 'Quản lý tài khoản của riêng bạn',
};

const Account = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) => {
  const { t = 'security' } = await searchParams;

  return (
    <div className="container my-8">
      <h1 className="text-2xl font-semibold mb-7">Tài khoản</h1>
      <Tabs value={t}>
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="security" asChild>
            <Link href="?t=security" className="flex items-center gap-2">
              <LockClosedIcon className="mr-2" />
              <span className="max-md:sr-only">Bảo mật</span>
            </Link>
          </TabsTrigger>
          <TabsTrigger value="payment" asChild>
            <Link href="?t=payment" className="flex items-center gap-2">
              <LuCreditCard />
              <span className="max-md:sr-only">Thanh toán</span>
            </Link>
          </TabsTrigger>
          <TabsTrigger value="devices" asChild>
            <Link href="?t=devices" className="flex items-center gap-2">
              <DesktopIcon />
              <span className="max-md:sr-only">Thiết bị đăng nhập</span>
            </Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="security">
          <Security />
        </TabsContent>
        <TabsContent value="payment">
          <Payment />
        </TabsContent>
        <TabsContent value="devices">
          <Devices />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export function generateStaticParams() {
  return [{ role: 'influencer' }, { role: 'brand' }];
}

export default Account;
