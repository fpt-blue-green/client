import http from '@/lib/http';
import { BasicBodyType } from '@/schema-validations/campaign.schema';
import ITag from '@/types/tag';
const tagsRequest = {
  getTagById: (id: string) => http.get<ITag>(`/Tags/${id}`, { noToken: false, next: { revalidate: 60 } }),
  createTag: (body: BasicBodyType) => http.post('/Tags', body),
  updateTag: (id: string, body: BasicBodyType) => http.put(`/Tags/${id}`, body),
  delete: (id: string) => http.delete(`/Tags/${id}`),
};
export default tagsRequest;
