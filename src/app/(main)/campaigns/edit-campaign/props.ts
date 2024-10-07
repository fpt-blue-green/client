import ICampaign from '@/types/campaign';
import { KeyedMutator } from 'swr/_internal';

interface CampaignDetailsProps {
  campaign: ICampaign;
  // mutate: KeyedMutator<ICampaign>;
}

export default CampaignDetailsProps;
