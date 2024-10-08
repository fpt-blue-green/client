import ICampaign from '@/types/campaign';
import { KeyedMutator } from 'swr/_internal';
interface CampaignDetailsProps {
  id: string;
  campaign: ICampaign;
  mutate: KeyedMutator<ICampaign>;
}

export default CampaignDetailsProps;
