'use client';
import UserTable from './table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FaPeopleGroup } from 'react-icons/fa6';
import BanUserTable from './ban-user-table';
import { useRef } from 'react';
import { TableRef } from '@/components/custom/data-table';

const TabList = () => {
  const userTableRef = useRef<TableRef>(null);
  const banUserTableRef = useRef<TableRef>(null);

  // Function to reload both tables
  const reloadTables = async () => {
    await Promise.all([userTableRef.current?.reload(), banUserTableRef.current?.reload()]);
  };

  return (
    <Tabs defaultValue="general">
      <TabsList className="my-4 flex flex-wrap w-1/2">
        <TabsTrigger value="general" className="flex-1 py-1">
          <FaPeopleGroup />
          <span className="max-md:hidden ml-2">Toàn bộ</span>
        </TabsTrigger>
        <TabsTrigger value="ban" className="flex-1 py-1">
          <FaPeopleGroup />
          <span className="max-md:hidden ml-2">Lịch sử bị cấm</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="general">
        <p className="text-sm text-muted-foreground">Dưới đây là danh sách toàn bộ người dùng của hệ thống!</p>
        <div className="mt-4">
          <UserTable ref={userTableRef} reloadTable={reloadTables} />
        </div>
      </TabsContent>
      <TabsContent value="ban">
        <p className="text-sm text-muted-foreground">Dưới đây là danh sách toàn bộ người bị cấm dùng của hệ thống!</p>
        <div className="mt-4">
          <BanUserTable ref={banUserTableRef} reloadTable={reloadTables} />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default TabList;
