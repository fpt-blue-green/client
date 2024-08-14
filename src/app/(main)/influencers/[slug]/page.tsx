import { FC } from 'react';
import { LuHeart, LuShare } from 'react-icons/lu';
import PersonalInfo from './personal-info';
import { Button } from '@/components/ui/button';
import { person } from './constant';
import Packages from './packages';
import InfluencerList from '@/components/influencer-list';
import Categories from './categories';

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
      <Packages />
      <InfluencerList className="mt-20 mx-6" title="Những người nổi tiếng tương tự" subtitle="" />
      <Categories />
    </div>
  );
};

export default InfluencerDetails;
