import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LockClosedIcon } from '@radix-ui/react-icons';
import Security from './security';
import { getServerSession } from 'next-auth';

const Account = async () => {
  const session = await getServerSession();

  return (
    <div className="container my-8">
      <h1 className="text-2xl font-semibold mb-7">Tài khoản</h1>
      <Tabs defaultValue="security">
        <TabsList className="h-13 mb-8">
          <TabsTrigger value="security" className="py-3 px-10">
            <LockClosedIcon className="mr-2" />
            Bảo mật
          </TabsTrigger>
        </TabsList>
        <TabsContent value="security">{session?.user && <Security />}</TabsContent>
      </Tabs>
    </div>
  );
};

export default Account;
