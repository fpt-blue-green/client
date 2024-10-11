import IBrand from './brand';
import { EContentType, EPlatform } from './enum';
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
}

export interface IContent {
  id: string;
  platform: EPlatform;
  contentType: EContentType;
  quantity: number;
  content: string;
}

export default ICampaign;
