import { Metadata } from 'next';
import UserTable from './table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FaPeopleGroup } from 'react-icons/fa6';
export const metadata: Metadata = {
  title: 'Quản Lí Người Dùng',
};

const InfluencerManagement = () => {
  return (
    <div className="container">
      <h1 className="text-xl font-semibold">Quản Lí Người Dùng</h1>
      <Tabs defaultValue="general">
        <TabsList className="my-4 flex flex-wrap w-1/2">
          <TabsTrigger value="general" className="flex-1 py-1">
            <FaPeopleGroup />
            <span className="max-md:hidden ml-2">Toàn bộ</span>
          </TabsTrigger>
          <TabsTrigger value="ban" className="flex-1 py-1">
            <FaPeopleGroup />
            <span className="max-md:hidden ml-2">Bị Cấm</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <p className="text-sm text-muted-foreground">Dưới đây là danh sách toàn bộ người dùng của hệ thống!</p>
          <div className="mt-4">
            <UserTable isGeneralTable={true} />
          </div>
        </TabsContent>
        <TabsContent value="ban">
          <p className="text-sm text-muted-foreground">Dưới đây là danh sách toàn bộ người bị cấm dùng của hệ thống!</p>
          <div className="mt-4">
            <UserTable isGeneralTable={false} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InfluencerManagement;
