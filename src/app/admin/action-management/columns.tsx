'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Tooltip from '@/components/custom/tooltip';
import { formats } from '@/lib/utils';
import IAdminAction from '@/types/action';
import { ColumnDef } from '@tanstack/react-table';
import { EAdminActionType } from '@/types/enum';

const ConvertActionTypeToString: { [key in EAdminActionType]: string } = {
  [EAdminActionType.Create]: 'Tạo mới',
  [EAdminActionType.Update]: 'Cập nhật',
  [EAdminActionType.Delete]: 'Xoá',
  [EAdminActionType.BanUser]: 'Cấm người dùng',
  [EAdminActionType.RejectWithDraw]: 'Từ chối yêu cầu rút tiền',
  [EAdminActionType.ApproveWithDraw]: 'Phê duyệt yêu cầu rút tiền',
  [EAdminActionType.ApproveUpdatePremium]: 'Phê duyệt yêu cầu nâng cấp tài khoản Premium',
  [EAdminActionType.RejectUpdatePremium]: 'Từ chối yêu cầu nâng cấp tài khoản Premium',
};

export const columns: ColumnDef<IAdminAction, IAdminAction>[] = [
  {
    id: 'actionType',
    accessorKey: 'actionType',
    header: 'Hoạt động',
    cell: ({ row }) => (
      <div className="flex items-center gap-2 ">{ConvertActionTypeToString[row.original.actionType]}</div>
    ),
  },
  {
    id: 'actionDetails',
    accessorKey: 'actionDetails',
    header: 'Chi tiết hoạt động',
    enableSorting: false,
    cell: ({ row }) => (
      <Tooltip label={row.original.actionDetails || ''}>
        <div className="truncate max-w-80">{row.original.actionDetails}</div>
      </Tooltip>
    ),
  },
  {
    id: 'actionDate',
    accessorKey: 'actionDate',
    header: 'Ngày thực hiện',
    enableSorting: true,
    cell: ({ row }) => formats.date(row.original.actionDate),
  },
  {
    id: 'user',
    accessorKey: 'user',
    header: 'Người thực hiện',
    enableSorting: false,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={row.original.user.image} alt={`Ảnh đại diện của ${row.original.user.name}`} />
          <AvatarFallback>{row.original.user.name}</AvatarFallback>
        </Avatar>
        <span>{row.original.user.name}</span>
      </div>
    ),
  },
];
