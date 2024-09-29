import http from '@/lib/http';
import { BasicBodyType } from '@/schema-validations/campaign.schema';

const campaignsRequest = {
  createCampaign: (body: BasicBodyType) =>
    http.post('/Campaign', { ...body, startDate: body.dates[0], endDate: body.dates[1] }),
};

export default campaignsRequest;
