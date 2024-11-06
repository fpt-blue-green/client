'use client';

import { useRef } from 'react';
import Table, { TableRef } from '@/components/custom/data-table';
import { columns } from './columns';

const AdminActionTable = () => {
  const tableRef = useRef<TableRef>(null);
  return <Table ref={tableRef} columns={columns} url="/AdminAction" />;
};

export default AdminActionTable;
