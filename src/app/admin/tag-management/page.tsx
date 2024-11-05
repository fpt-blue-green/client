import TagTable from './table';
import { Metadata } from 'next';

export const metadata: Metadata = {
  openGraph: {
    description: 'Nhằm Quản Lí Các Thẻ Của Hệ Thống Hiệu Quả',
    type: 'website',
    siteName: 'adfusion',
  },
};

const TagManagement = () => {
  return (
    <div className="container">
      <h1 className="text-xl font-semibold">Quản Lí Các Thẻ</h1>
      <p className="text-sm text-muted-foreground">Dưới đây là danh sách toàn bộ thẻ của hệ thống!</p>
      <div className="mt-4">
        <TagTable />
      </div>
    </div>
  );
};

export default TagManagement;
