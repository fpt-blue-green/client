import React from 'react';
import { LuHeart, LuShare } from 'react-icons/lu';
import PersonalInfo from '../personal-info';
import { person } from '@/constants/constants';

const InfluencerDetails: React.FC = () => {
  return (
    <div className="container w-full my-8 ">
      <div className="flex space-x-6 justify-end my-6">
        <div className="flex items-center space-x-2">
          <LuShare />
          <span>Chia sẽ</span>
        </div>
        <div className="flex items-center space-x-2">
          <LuHeart />
          <span>Yêu thích</span>
        </div>
      </div>
      <PersonalInfo influencer={person} />
    </div>
  );
};

export default InfluencerDetails;
