'use client';

import Table from '@/components/custom/data-table';
import { columns, filters } from './columns';

const InfluencerTable = () => {
  return <Table columns={columns} url="/Influencers" filters={filters} onCheck={console.log} />;
};
export default InfluencerTable;
