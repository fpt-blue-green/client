import { FC } from 'react';
import { LuHeart, LuShare } from 'react-icons/lu';
import PersonalInfo from './personal-info';
import { Button } from '@/components/ui/button';
import { person } from './constant';

const InfluencerDetails: FC = () => {
  return (
    <div className="container w-full my-8 ">
      <div className="flex space-x-6 justify-end my-6">
        <div className="flex items-center space-x-2">
          <Button variant="ghost">
            <LuShare />
            <span> Chia Sẻ</span>
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost">
            <LuHeart />
            <span>Yêu thích</span>
          </Button>
        </div>
      </div>
      <PersonalInfo influencer={person} />
    </div>
  );
};

export default InfluencerDetails;
