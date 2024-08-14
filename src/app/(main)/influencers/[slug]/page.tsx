import { FC } from 'react';
import { LuHeart, LuShare } from 'react-icons/lu';
import PersonalInfo from './personal-info';
import { Button } from '@/components/ui/button';
import { person } from './constant';

const InfluencerDetails: FC = () => {
  return (
    <div className="container w-full my-8 ">
      <div className="flex space-x-1 justify-end my-4">
        <Button variant="ghost">
          <LuShare />
          <span> Chia Sẻ</span>
        </Button>
        <Button variant="ghost">
          <LuHeart />
          <span>Yêu thích</span>
        </Button>
      </div>
      <PersonalInfo item={person} />
    </div>
  );
};

export default InfluencerDetails;
