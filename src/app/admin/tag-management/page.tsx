'use client';
// import { Table } from '@/components/custom/table';
import { tagColumns } from '../columns';
import { useRef } from 'react';

const TagManagement = () => {
  const handleOpen = () => {};

  const buttons = [
    {
      text: 'Thêm',
      onClick: () => {
        handleOpen();
      },
    },
  ];

  const tableRef = useRef();

  return (
    <div className="container">
      <h1 className="text-xl font-semibold">Quản Lí Các Thẻ</h1>
      <p className="text-sm text-muted-foreground">Dưới đây là danh sách toàn bộ thẻ của hệ thống!</p>
      {/* <Table
        ref={tableRef}
        columns={tagColumns}
        url={'https://671de7ea1dfc42991980a5cc.mockapi.io/api/tags'}
        buttons={buttons}
        searchable
        isCheckBoxVisibility
        pagination
      /> */}
    </div>
  );
};

export default TagManagement;
