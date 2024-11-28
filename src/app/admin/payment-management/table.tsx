'use client';

import Table from '@/components/custom/data-table';
import { columns, filters } from './columns';

const PaymentTable = () => {
  return (
    <Table url="/Payment" columns={columns} filters={filters} defaultSorting={[{ id: 'createdAt', desc: true }]} />
  );
};

export default PaymentTable;
