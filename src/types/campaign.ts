import IBrand from './brand';
import { ECampaignStatus, EContentType, EPlatform } from './enum';
import IImage from './image';
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

export interface IContent {
  id: string;
  platform: EPlatform;
  contentType: EContentType;
  quantity: number;
  price: number;
  targetReaction: number;
  description: string;
}

export default ICampaign;
