'use client';

import Table, { TableRef } from '@/components/custom/data-table';
import { columns, filters } from './columns';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { forwardRef, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { constants, emitter } from '@/lib/utils';
import { toast } from 'sonner';
import ActionForm from './action-form';
import { userRequest } from '@/request';
import IUserManagement from '@/types/user-management';

interface IUserTableProps {
  reloadTable: () => void;
}

const UserTable = forwardRef<TableRef, IUserTableProps>((props, ref) => {
  const columnsWithActions: ColumnDef<IUserManagement, IUserManagement>[] = [
    ...columns,
    {
      id: 'actions',
      cell: ({ row }) => {
        const user = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="flex flex-col gap-1">
              {user.isBanned ? (
                <DropdownMenuItem
                  onClick={() => {
                    openBanOrUnBan(user, false);
                  }}
                >
                  Huỷ lệnh cấm
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={() => {
                    openBanOrUnBan(user, true);
                  }}
                >
                  Cấm
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={handleDelete(user)}>Xóa</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  const [user, setUser] = useState<IUserManagement>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isBan, setIsBan] = useState<boolean>(false);

  const handleDelete = (user: IUserManagement) => () => {
    const userDeletion = userRequest.delete(user.id);
    emitter.confirm({
      content: `Bạn có chắc khi muốn xóa người dùng ${user.displayName}?`,
      callback: () =>
        toast.promise(userDeletion, {
          loading: 'Đang tải',
          success: () => {
            props.reloadTable();
            return 'Đã xóa người dùng thành công.';
          },
          error: (err) => err?.message || constants.sthWentWrong,
        }),
    });
  };

  const openBanOrUnBan = (user: IUserManagement, isBan: boolean) => {
    setIsBan(isBan);
    setIsOpen(true);
    setUser(user);
  };

  const handleClose = () => {
    setIsOpen(false);
    setUser(undefined);
    setIsBan(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Table columns={columnsWithActions} url="/User" filters={filters} ref={ref} />
      <DialogContent>
        <ActionForm handleClose={handleClose} item={user} reloadTable={props.reloadTable} isBan={isBan} />
      </DialogContent>
    </Dialog>
  );
});

UserTable.displayName = 'UserTable';

export default UserTable;
