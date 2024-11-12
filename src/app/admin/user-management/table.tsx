'use client';

import Table, { TableRef } from '@/components/custom/data-table';
import { columns, filters } from './columns';
import { Button, ButtonProps } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useRef, useState } from 'react';
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

const UserTable = () => {
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
              <DropdownMenuItem asChild>
                <DialogTrigger
                  onClick={() => {
                    handleOpen(user);
                  }}
                >
                  Chỉnh sửa
                </DialogTrigger>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  handleBan(user);
                }}
              >
                Cấm
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete(user)}>Xóa</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  const buttons: ButtonProps[] = [
    {
      children: 'Thêm',
      onClick: () => {
        handleOpen(undefined);
      },
    },
  ];
  const [user, setUser] = useState<IUserManagement>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isBan, setIsBan] = useState<boolean>(false);
  const tableRef = useRef<TableRef>(null);
  const reloadTable = async () => {
    await tableRef.current?.reload();
  };
  const handleDelete = (user: IUserManagement) => () => {
    const userDeletion = userRequest.delete(user.id);
    emitter.confirm({
      content: `Bạn có chắc khi muốn xóa người dùng ${user.displayName}?`,
      callback: () =>
        toast.promise(userDeletion, {
          loading: 'Đang tải',
          success: () => {
            reloadTable();
            return 'Đã xóa người dùng thành công.';
          },
          error: (err) => err?.message || constants.sthWentWrong,
        }),
    });
  };

  const handleBan = (user: IUserManagement) => {
    setIsOpen(true);
    setUser(user);
    setIsBan(true);
  };

  const handleOpen = (user?: IUserManagement) => {
    setIsOpen(true);
    setUser(user);
    setIsBan(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setUser(undefined);
    setIsBan(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Table columns={columnsWithActions} url="/User" filters={filters} buttons={buttons} />
      <DialogContent>
        <ActionForm handleClose={handleClose} item={user} reloadTable={reloadTable} isBan={isBan} />
      </DialogContent>
    </Dialog>
  );
};
export default UserTable;
