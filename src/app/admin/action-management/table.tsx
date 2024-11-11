'use client';

import { useRef } from 'react';
import Table, { TableRef } from '@/components/custom/data-table';
import { columns } from './columns';
import { ButtonProps } from '@/components/ui/button';
import { DownloadIcon } from 'lucide-react';
import { adminRequest } from '@/request';
import { formats } from '@/lib/utils';

const AdminActionTable = () => {
  const tableRef = useRef<TableRef>(null);

  const handleExport = () => {
    adminRequest.adminActionExport().then((res) => {
      const url = window.URL.createObjectURL(res.data); // tạo URL tạm thời cho blob
      const a = document.createElement('a');
      a.href = url;
      a.download = `AdminActionData_${formats.date(new Date(), true)}.csv`; // tên file tải về, có thể lấy từ header của response
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    });
  };

  const buttons: ButtonProps[] = [
    {
      children: 'Tải file',
      variant: 'gradient',
      onClick: handleExport,
      startIcon: <DownloadIcon size={14} />,
    },
  ];

  return <Table ref={tableRef} columns={columns} url="/AdminAction" buttons={buttons} />;
};

export default AdminActionTable;
