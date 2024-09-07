import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeftIcon, IdCardIcon } from '@radix-ui/react-icons';
import { getServerSession } from 'next-auth';
import { FaBox, FaNetworkWired, FaPerson, FaRegImages } from 'react-icons/fa6';
import Details from './Details';
import Link from 'next/link';
import config from '@/config';

const EditInfluencerProfile = async () => {
  const session = await getServerSession();
  return (
    <div className="container mt-8 mb-16">
      <Button size="medium" variant="ghost">
        <Link href={config.routes.home} className="flex items-center">
          <ArrowLeftIcon />
          Trở về trang chủ
        </Link>
      </Button>
      <h1 className="text-2xl font-semibold mt-6 mb-12">Chỉnh Sửa Thông Tin</h1>
      <Tabs defaultValue="details">
        <TabsList className="h-13 mb-8">
          <TabsTrigger value="details" className="py-3 px-10">
            <IdCardIcon className="mr-2" />
            Chi tiết
          </TabsTrigger>
          <TabsTrigger value="socialMedias" className="py-3 px-10">
            <FaNetworkWired className="mr-2" />
            Mạng xã hội
          </TabsTrigger>
          <TabsTrigger value="images" className="py-3 px-10">
            <FaRegImages className="mr-2" />
            Thư viện ảnh
          </TabsTrigger>
          <TabsTrigger value="packages" className="py-3 px-10">
            <FaBox className="mr-2" />
            Các gói
          </TabsTrigger>
          <TabsTrigger value="portfolio" className="py-3 px-10">
            <FaPerson className="mr-2" />
            Hồ sơ
          </TabsTrigger>
        </TabsList>
        <TabsContent value="details">{session?.user && <Details user={session.user} />}</TabsContent>
        <TabsContent value="socialMedias"></TabsContent>
        <TabsContent value="images"></TabsContent>
        <TabsContent value="packages"></TabsContent>
        <TabsContent value="portfolio"></TabsContent>
      </Tabs>
    </div>
  );
};

export default EditInfluencerProfile;
