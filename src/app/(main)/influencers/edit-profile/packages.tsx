'use client';
import { FC } from 'react';
import Paper from '@/components/custom/paper';
import { EPlatform } from '@/types/enum';
import { ColumnDef } from '@tanstack/react-table';
import DataTable from '@/components/custom/data-table';
import { formats } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import Tooltip from '@/components/custom/tooltip';

interface IPackagesProps {
  id: string;
  influencerId: string;
  platform: EPlatform;
  contentType: number;
  duration: number;
  description: string;
  price: number;
  quantity: number;
  influencer: string;
}

const Packages: FC<IPackagesProps[]> = (props) => {
  const {} = props;
  return (
    <Paper>
      <div>
        <h3 className="font-semibold text-xl mb-4">Quản Lý Các Gói</h3>
        <DataTable columns={packagesColumns} data={influencerPackages} />
      </div>
    </Paper>
  );
};

export default Packages;

const influencerPackages: IPackagesProps[] = [
  {
    id: '001',
    influencerId: '1',
    platform: EPlatform.TitTok,
    contentType: 0,
    duration: 0,
    description: 'Quảng bá sản phẩm của bạn thông qua 2 bài đăng trên trang cá nhân TikTok của tôi.',
    price: 500000,
    quantity: 2,
    influencer: 'Lucy Truong',
  },
  {
    id: '002',
    influencerId: '1',
    platform: EPlatform.Instagram,
    contentType: 0,
    duration: 0,
    description: 'Quảng bá sản phẩm của bạn thông qua 1 bài đăng trên trang cá nhân Instagram của tôi.',
    price: 300000,
    quantity: 1,
    influencer: 'Lucy Truong',
  },
  {
    id: '003',
    influencerId: '1',
    platform: EPlatform.TitTok,
    contentType: 0,
    duration: 0,
    description: 'Quảng bá sản phẩm của bạn thông qua 2 bài đăng trên trang cá nhân TikTok của tôi.',
    price: 500000,
    quantity: 2,
    influencer: 'Lucy Truong',
  },
  {
    id: '004',
    influencerId: '1',
    platform: EPlatform.Instagram,
    contentType: 0,
    duration: 0,
    description: 'Quảng bá sản phẩm của bạn thông qua 1 bài đăng trên trang cá nhân Instagram của tôi.',
    price: 300000,
    quantity: 1,
    influencer: 'Lucy Truong',
  },
];

const packagesColumns: ColumnDef<IPackagesProps>[] = [
  {
    accessorKey: 'select',
    header: '',
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: 'Mã gói',
  },
  {
    accessorKey: 'platform',
    header: 'Nền tảng',
    cell: ({ row }) => {
      const platformNum: number = row.getValue('platform');
      return <div>{EPlatform[platformNum]}</div>;
    },
  },
  {
    accessorKey: 'description',
    header: 'Mô tả',
    cell: ({ row }) => {
      const packageDesc: string = row.getValue('description');
      return (
        <Tooltip label={packageDesc}>
          <p className="max-w-24 truncate">{packageDesc}</p>
        </Tooltip>
      );
    },
  },
  {
    accessorKey: 'duration',
    header: 'Thời lượng',
  },
  {
    accessorKey: 'quantity',
    header: 'Số lượng',
  },
  {
    accessorKey: 'price',
    header: 'Giá gói',
    cell: ({ row }) => {
      const packagePrice: number = row.getValue('price');
      return <div>{formats.price(packagePrice)}</div>;
    },
  },
];
