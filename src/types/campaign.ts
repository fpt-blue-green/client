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
  brandId: string;
}

interface IContent {
  id: string;
  platform: EPlatform;
  contentType: EContentType;
  quantity: number;
  content: string;
}

export default ICampaign;
