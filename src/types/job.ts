import ICampaign from './campaign';
import { EJobStatus } from './enum';
import IInfluencer from './influencer';
import IOffer from './offer';

interface IJob {
  id: string;
  influencerId: string;
  campaignId: string;
  status: EJobStatus;
  campaign: ICampaign;
  influencer: IInfluencer;
  offer: IOffer;
}

export default IJob;
