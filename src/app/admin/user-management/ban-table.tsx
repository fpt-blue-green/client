'use client';
import Table, { TableRef } from '@/components/custom/data-table';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useRef, useState } from 'react';
import { banUserColumns } from './columns';
import { IBanUserManagement } from '@/types/user-management';

const BanUserTable = () => {
  const [user, setUser] = useState<IBanUserManagement>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const tableRef = useRef<TableRef>(null);
  const reloadTable = async () => {
    await tableRef.current?.reload();
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Table columns={banUserColumns} url="/BanUser" />
      <DialogContent>
        {/* <ActionForm handleClose={handleClose} item={user} reloadTable={reloadTable} /> */}
      </DialogContent>
    </Dialog>
  );
};

export default BanUserTable;
