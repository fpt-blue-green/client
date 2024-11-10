'use client';

import { useRef } from 'react';
import Table, { TableRef } from '@/components/custom/data-table';
import { columns } from './columns';
import { ButtonProps } from '@/components/ui/button';
import { DownloadIcon } from 'lucide-react';
import exportRequest from '@/request/export.reqeust';

const AdminActionTable = () => {
  const handleExport = () => {
    const downloadFile = exportRequest.adminActionExport();
  };

  const buttons: ButtonProps[] = [
    {
      children: 'Tải file',
      variant: 'gradient',
      onClick: handleExport,
      startIcon: <DownloadIcon size={14} />,
    },
  ];
  const tableRef = useRef<TableRef>(null);
  return <Table ref={tableRef} columns={columns} url="/AdminAction" buttons={buttons} />;
};

export default AdminActionTable;
