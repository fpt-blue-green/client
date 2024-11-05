'use client';
import { useRef, useState } from 'react';
import Table, { TableRef } from '@/components/custom/data-table';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { columns } from './columns';

const AdminActionTable = () => {
  const [open, setOpen] = useState<boolean>(false);
  const tableRef = useRef<TableRef>(null);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Table ref={tableRef} columns={columns} url="/AdminAction" />
      <DialogContent>{/* <ActionForm handleClose={handleClose} item={tag} reload={reloadTable} /> */}</DialogContent>
    </Dialog>
  );
};

export default AdminActionTable;
