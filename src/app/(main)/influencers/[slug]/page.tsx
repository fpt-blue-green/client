import { FC } from 'react';
import PersonalInfo from './personal-info';
import { person } from './constant';
import Packages from './packages';
import InfluencerList from '@/components/influencer-list';
import Categories from './categories';

const InfluencerDetails: FC = () => {
  return (
    <div className="container my-8">
      <PersonalInfo item={person} />
      <Packages />
      <InfluencerList className="mt-20 mx-6" title="Những người nổi tiếng tương tự" />
    </div>
  );
};

export default InfluencerDetails;
