'use client';
import Table, { TableRef } from '@/components/custom/data-table';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { forwardRef, useState } from 'react';
import { banUserColumns } from './columns';
import { IBanUserManagement } from '@/types/user-management';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ActionForm from './action-form';
import { ColumnDef } from '@tanstack/react-table';
import { Button, ButtonProps } from '@/components/ui/button';
import { DownloadIcon, MoreHorizontal } from 'lucide-react';
import { adminRequest } from '@/request';
import { formats } from '@/lib/utils';
interface IBanUserTableProps {
  reloadTable: () => void;
}

const BanUserTable = forwardRef<TableRef, IBanUserTableProps>((props, ref) => {
  const handleExport = () => {
    adminRequest.adminBannedUserExport().then((res) => {
      const url = window.URL.createObjectURL(res.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = `BannedUserData_${formats.date(new Date(), true)}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    });
  };
  const buttons: ButtonProps[] = [
    {
      children: 'Tải file',
      variant: 'gradient',
      onClick: handleExport,
      startIcon: <DownloadIcon size={14} />,
    },
  ];

  return <Table columns={banUserColumns} url="/BanUser" buttons={buttons} ref={ref} />;
});

BanUserTable.displayName = 'BanUserTable';

export default BanUserTable;
