import ICampaign from './campaign';
import { EJobStatus } from './enum';
import IInfluencer from './influencer';

interface IJob {
  id: string;
  influencerId: string;
  campaignId: string;
  status: EJobStatus;
  campaign: ICampaign;
  influencer: IInfluencer;
}

export default IJob;
