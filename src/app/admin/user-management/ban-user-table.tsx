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
  const columnsWithActions: ColumnDef<IBanUserManagement, IBanUserManagement>[] = [
    ...banUserColumns,
    {
      id: 'actions',
      cell: ({ row }) => {
        const user = row.original;
        const isActive = user.isActive;
        return isActive ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="flex flex-col gap-1">
              <DropdownMenuItem
                onClick={() => {
                  handleUnBan(user);
                }}
              >
                Huỷ lệnh cấm
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <></>
        );
      },
    },
  ];
  const [user, setUser] = useState<IBanUserManagement>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isBan, setIsBan] = useState<boolean>(false);
  const [isBanOrUnBanForm, setIsBanOrUnBanForm] = useState<boolean>(false);

  const handleUnBan = (user: IBanUserManagement) => {
    setIsOpen(true);
    setUser(user);
    setIsBanOrUnBanForm(true);
    setIsBan(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setUser(undefined);
    setIsBanOrUnBanForm(false);
    setIsBan(false);
  };
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Table columns={columnsWithActions} url="/BanUser" buttons={buttons} ref={ref} />
      <DialogContent>
        <ActionForm
          handleClose={handleClose}
          banItem={user}
          reloadTable={props.reloadTable}
          isBanOrUnBanForm={isBanOrUnBanForm}
          isBan={isBan}
        />
      </DialogContent>
    </Dialog>
  );
});

BanUserTable.displayName = 'BanUserTable';

export default BanUserTable;
