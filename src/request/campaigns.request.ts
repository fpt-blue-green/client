import http from '@/lib/http';
import { BasicBodyType } from '@/schema-validations/campaign.schema';

const campaignsRequest = {
  getCampaignById: (id: string) => http.get(`/Campaign/${id}`, { noToken: false, next: { revalidate: 60 } }),
  createCampaign: (body: BasicBodyType) =>
    http.post('/Campaign', { ...body, startDate: body.dates[0], endDate: body.dates[1] }),
};

export default campaignsRequest;
