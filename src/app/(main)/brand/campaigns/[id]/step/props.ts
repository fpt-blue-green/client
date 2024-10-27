import ICampaign from '@/types/campaign';
import { KeyedMutator } from 'swr/_internal';

interface DetailStepProps {
  id: string;
  campaign?: ICampaign;
  mutate: KeyedMutator<ICampaign>;
}

export default DetailStepProps;
