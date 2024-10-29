'use client';

import Table from '@/components/custom/data-table';
import { columns, filters } from './columns';
import { ButtonProps } from '@/components/ui/button';

const InfluencerTable = () => {
  const buttons: ButtonProps[] = [
    {
      children: 'Thêm',
    },
  ];

  return <Table columns={columns} url="/Influencers" filters={filters} buttons={buttons} />;
};
export default InfluencerTable;
