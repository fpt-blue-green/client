'use client';
import { FC } from 'react';
import Paper from '@/components/custom/paper';
import { EPlatform } from '@/types/enum';

interface IPackagesProps {
  id: string;
  influencerId: string;
  platform: EPlatform;
  contentType: number;
  duration: number;
  description: string;
  price: number;
  quantity: number;
  influencer: string;
}

const Packages: FC<IPackagesProps[]> = (props) => {
  const {} = props;
  return (
    <Paper>
      <div>
        <h3 className="font-semibold text-xl mb-4">Quản Lý Các Gói</h3>
      </div>
    </Paper>
  );
};

export default Packages;
