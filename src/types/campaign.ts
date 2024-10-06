import ITag from './tag';

interface ICampaign {
  id: string;
  name: string;
  title: string;
  description: string;
  tags: ITag[];
  startDate: string;
  endDate: string;
  budget: number;
  brandId: string;
}

export default ICampaign;
