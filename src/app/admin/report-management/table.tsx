'use client';

import Table, { TableRef } from '@/components/custom/data-table';
import { columns } from './columns';
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
import { toast } from 'sonner';
import ActionForm from './action-form';
import IReport from '@/types/report';
import { adminRequest } from '@/request';

const ReportTable = () => {
  const tableRef = useRef<TableRef>(null);

  const reloadTable = async () => {
    await tableRef.current?.reload();
  };

  const [open, setOpen] = useState(false);
  const [report, setReport] = useState<IReport>();

  const columnsWithActions: ColumnDef<IReport, IReport>[] = [
    ...columns,
    {
      id: 'actions',
      cell: ({ row }) => {
        const report = row.original;
        return report.reportStatus === 0 ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="flex flex-col gap-1">
              <DropdownMenuItem>
                <DialogTrigger onClick={handleOpen(report)}>Chấp thuận</DialogTrigger>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DialogTrigger onClick={() => handleReject(report)}>Từ chối</DialogTrigger>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <></>
        );
      },
    },
  ];

  const handleOpen = (report?: IReport) => () => {
    setReport(report);
    setOpen(true);
  };

  const handleReject = (report: IReport) => {
    const caller = adminRequest.rejectReport(report.id || '');
    emitter.confirm({
      content: 'Bạn có chắc khi muốn từ chối báo cáo này?',
      callback: () =>
        toast.promise(caller, {
          loading: 'Đang tải',
          success: () => {
            reloadTable();
            return 'Đã từ chối báo cáo thành công.';
          },
          error: (err) => err?.message || constants.sthWentWrong,
        }),
    });
  };

  const handleClose = () => {
    setReport(undefined);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Table ref={tableRef} columns={columnsWithActions} url="/Report" />
      <DialogContent>
        <ActionForm handleClose={handleClose} item={report} reload={reloadTable} />
      </DialogContent>
    </Dialog>
  );
};

export default ReportTable;
