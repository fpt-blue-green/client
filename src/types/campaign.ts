interface ICampaign {
  id: string;
  name: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  budget: number;
  brandId: string;
}

export default ICampaign;
