'use client';

import Table, { TableRef } from '@/components/custom/data-table';
import { columns, filters } from './columns';
import { Button, ButtonProps } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useRef, useState } from 'react';
import IInfluencer from '@/types/influencer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import manageInfluencersRequest from '@/request/manage.influencers.request';
import { constants, emitter } from '@/lib/utils';
import { toast } from 'sonner';

const InfluencerTable = () => {
  const columnsWithActions: ColumnDef<IInfluencer, IInfluencer>[] = [
    ...columns,
    {
      id: 'actions',
      cell: ({ row }) => {
        const influencer = row.original;
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
                    handleOpen(influencer);
                  }}
                >
                  Chỉnh sửa
                </DialogTrigger>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  handleDelete(influencer);
                }}
              >
                Xóa
              </DropdownMenuItem>
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
  const [influencer, setInfluencer] = useState<IInfluencer>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const tableRef = useRef<TableRef>(null);
  const reloadTable = async () => {
    await tableRef.current?.reload();
  };
  const handleDelete = (influencer: IInfluencer) => () => {
    const influencerDeletion = manageInfluencersRequest.delete(influencer.id);
    emitter.confirm({
      content: `Bạn có chắc khi muốn xóa nhà sáng tạo ${influencer.fullName}?`,
      callback: () =>
        toast.promise(influencerDeletion, {
          loading: 'Đang tải',
          success: () => {
            reloadTable();
            return 'Đã xóa thẻ thành công.';
          },
          error: (err) => err?.message || constants.sthWentWrong,
        }),
    });
  };

  const handleOpen = (influencer?: IInfluencer) => {
    setIsOpen(true);
    setInfluencer(influencer);
  };

  const handleClose = () => {
    setIsOpen(false);
    setInfluencer(undefined);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Table columns={columnsWithActions} url="/Influencers" filters={filters} buttons={buttons} />
      <DialogContent>Hi</DialogContent>
    </Dialog>
  );
};
export default InfluencerTable;
