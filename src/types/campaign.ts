import IBrand from './brand';
import { ECampaignStatus } from './enum';
import IImage from './image';
import { IContent } from './offer';
import ITag from './tag';

interface ICampaign {
  id: string;
  name: string;
  title: string;
  description: string;
  tags: ITag[];
  images: IImage[];
  contents: IContent[];
  startDate: string;
  endDate: string;
  budget: number;
  brand: IBrand;
  status: ECampaignStatus;
}

export default ICampaign;
