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

const ReportTable = () => {
  const tableRef = useRef<TableRef>(null);

  const reloadTable = async () => {
    await tableRef.current?.reload();
  };

  const [open, setOpen] = useState(false);
  const [report, setReport] = useState<IReport>();

  const columnsWithActions: ColumnDef<IReport, IReport>[] = [...columns];

  const handleOpen = (report?: IReport) => () => {
    setReport(report);
    setOpen(true);
  };

  const handleReject = (report?: IReport) => () => {};

  const handleClose = () => {
    setReport(undefined);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Table ref={tableRef} columns={columnsWithActions} url="/Report" />
      <DialogContent>{/* <ActionForm handleClose={handleClose} item={report} reload={reloadTable} /> */}</DialogContent>
    </Dialog>
  );
};

export default ReportTable;
