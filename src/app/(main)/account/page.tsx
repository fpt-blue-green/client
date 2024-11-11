import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LockClosedIcon } from '@radix-ui/react-icons';
import { LuCreditCard } from 'react-icons/lu';
import Security from './security';
import Payment from './payment';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tài khoản',
  description: 'Quản lý tài khoản của riêng bạn',
};

const Account = async () => {
  return (
    <div className="container my-8">
      <h1 className="text-2xl font-semibold mb-7">Tài khoản</h1>
      <Tabs defaultValue="security">
        <TabsList className="mb-8">
          <TabsTrigger value="security" className="px-8">
            <LockClosedIcon className="mr-2" />
            Bảo mật
          </TabsTrigger>
          <TabsTrigger value="payment" className="px-8">
            <LuCreditCard className="mr-2" />
            Thanh toán
          </TabsTrigger>
        </TabsList>
        <TabsContent value="security">
          <Security />
        </TabsContent>
        <TabsContent value="payment">
          <Payment />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export function generateStaticParams() {
  return [{ role: 'influencer' }, { role: 'brand' }];
}

export default Account;
