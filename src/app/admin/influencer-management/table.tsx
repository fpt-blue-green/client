'use client';

import Table from '@/components/custom/data-table';
import columns from './columns';

const InfluencerTable = () => {
  return <Table columns={columns} url="/Influencers" onCheck={console.log} />;
};
export default InfluencerTable;
