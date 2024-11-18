'use client';

import Table, { TableRef } from '@/components/custom/data-table';
import { banUserColumns, columns, filters } from './columns';
import { Button, ButtonProps } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { FC, useRef, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DownloadIcon, MoreHorizontal } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { constants, emitter, formats } from '@/lib/utils';
import { toast } from 'sonner';
import ActionForm from './action-form';
import { adminRequest, userRequest } from '@/request';
import IUserManagement, { IBanUserManagement } from '@/types/user-management';

interface IUserTableProps {
  isGeneralTable?: boolean;
}

const UserTable: FC<IUserTableProps> = (props) => {
  const { isGeneralTable } = props;
  const [user, setUser] = useState<IUserManagement>();
  const [bannedUser, setBannedUser] = useState<IBanUserManagement>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isBanOrUnBanForm, setIsBanOrUnBanForm] = useState<boolean>(false);
  const generalTableRef = useRef<TableRef>(null);
  const bannedTableRef = useRef<TableRef>(null);

  // Handle General User Table
  const generalTableCols: ColumnDef<IUserManagement, IUserManagement>[] = [
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
  const generalTableButtons: ButtonProps[] = [
    {
      children: 'Thêm',
      onClick: () => {
        handleOpen(undefined);
      },
    },
  ];

  // Handle Banned User Table

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

  const bannedTableCols: ColumnDef<IBanUserManagement, IBanUserManagement>[] = [
    ...banUserColumns,
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
              <DropdownMenuItem
                onClick={() => {
                  handleUnBan(user);
                }}
              >
                Huỷ lệnh cấm
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  const bannedTableButtons: ButtonProps[] = [
    {
      children: 'Tải file',
      variant: 'gradient',
      onClick: handleExport,
      startIcon: <DownloadIcon size={14} />,
    },
  ];
  const handleUnBan = (bannedUser: IBanUserManagement) => {
    setIsOpen(true);
    setBannedUser(bannedUser);
    setIsBanOrUnBanForm(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setUser(undefined);
    setIsBanOrUnBanForm(false);
  };

  const reloadTable = async () => {
    await generalTableRef.current?.reload();
    await bannedTableRef.current?.reload();
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
    setIsBanOrUnBanForm(true);
  };

  const handleOpen = (user?: IUserManagement) => {
    setIsOpen(true);
    setUser(user);
    setIsBanOrUnBanForm(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Table
        ref={isGeneralTable ? generalTableRef : bannedTableRef}
        columns={isGeneralTable ? (generalTableCols as IUserManagement[]) : (bannedTableCols as IBanUserManagement[])}
        url={isGeneralTable ? '/User' : '/BanUser'}
        buttons={isGeneralTable ? generalTableButtons : bannedTableButtons}
        filters={isGeneralTable ? filters : []}
      />
      <DialogContent>
        <ActionForm
          isGeneralTable={isGeneralTable}
          handleClose={handleClose}
          user={user}
          bannedUser={bannedUser}
          reloadTable={reloadTable}
          isBanOrUnBanForm={isBanOrUnBanForm}
        />
      </DialogContent>
    </Dialog>
  );
};
export default UserTable;
