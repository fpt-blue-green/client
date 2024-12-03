import http from '@/lib/http';
import { ReportInfluencerBasicBodyType } from '@/schema-validations/brand.schema';
import IBrand from '@/types/brand';

const brandsRequest = {
  getBrandById: (id: string) => http.get<IBrand>(`/Brands/${id}`, { noToken: true, next: { revalidate: 30 } }),
  reportInfluencer: (id: string, body: ReportInfluencerBasicBodyType) => http.post(`/Influencers/${id}/reports`, body),
  cancelReportInfluencer: (id: string) => http.delete(`/Influencers/${id}/reports`),
};

export default brandsRequest;
