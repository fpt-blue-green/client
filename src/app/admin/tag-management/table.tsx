import Table, { TableRef } from '@/components/custom/data-table';
import { columns } from './columns';
import { ButtonProps } from '@/components/ui/button';
import ITag from '@/types/tag';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { useRef, useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { constants, emitter } from '@/lib/utils';
import { tagRequest } from '@/request';
import { toast } from 'sonner';
import ActionForm from './action-form';

const TagTable = () => {
  const tableRef = useRef<TableRef>(null);
  const reloadTable = () => {
    tableRef.current?.reload();
  };

  const [open, setOpen] = useState(false);
  const [tag, setTag] = useState<ITag>();

  const columnsWithActions: ColumnDef<ITag, ITag>[] = [
    ...columns,
    {
      id: 'actions',
      cell: ({ row }) => {
        const tag = row.original;
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
                <DialogTrigger onClick={handleOpen(tag)}>Chỉnh sửa</DialogTrigger>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete(tag)}>Xóa</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleOpen = (tag?: ITag) => () => {
    setTag(tag);
    setOpen(true);
  };

  const handleClose = () => {
    setTag(undefined);
    setOpen(false);
  };

  const handleDelete = (tag: ITag) => () => {
    const caller = tagRequest.delete(tag.id);
    emitter.confirm({
      content: `Bạn có chắc khi muốn xóa thẻ ${tag.name}?`,
      callback: () =>
        toast.promise(caller, {
          loading: 'Đang tải',
          success: () => {
            reloadTable();
            return 'Đã xóa thẻ thành công.';
          },
          error: (err) => err?.message || constants.sthWentWrong,
        }),
    });
  };

  const buttons: ButtonProps[] = [
    {
      children: 'Thêm',
      onClick: handleOpen(undefined),
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Table ref={tableRef} columns={columnsWithActions} url="/Tags/filter" buttons={buttons} />
      <DialogContent>
        <ActionForm handleClose={handleClose} item={tag} reload={reloadTable} />
      </DialogContent>
    </Dialog>
  );
};

export default TagTable;
