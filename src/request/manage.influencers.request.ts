import http from '@/lib/http';
import { GeneralBodyType } from '@/schema-validations/influencer.schema';
import IInfluencer from '@/types/influencer';

// Chưa biết tên API
const manageInfluencersRequest = {
  get: () => http.get<IInfluencer>('/Influencers'),
  delete: (id: string) => http.delete(`/admin/Influencers/${id}`),
  addInfluencer: (body: GeneralBodyType) => http.post('/admin/Influencers', body),
  updateTag: (id: string, body: GeneralBodyType) => http.put(`/admin/Influencers/${id}`, body),
};

export default manageInfluencersRequest;
