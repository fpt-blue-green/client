import http from '@/lib/http';
import { BasicBodyType, ContentsBodyType } from '@/schema-validations/campaign.schema';

const campaignsRequest = {
  getCampaignById: (id: string) => http.get(`/Campaign/${id}`, { noToken: false, next: { revalidate: 60 } }),
  createCampaign: (body: BasicBodyType) =>
    http.post('/Campaign', { ...body, startDate: body.dates[0], endDate: body.dates[1] }),
  addTags: (id: string, tagIds: string[]) => http.post(`/Campaigns/${id}`, tagIds),
  uploadImages: (id: string, imageIds: string[], images: File[]) => {
    const formData = new FormData();
    imageIds.forEach((id) => formData.append('imageIds', id));
    images.forEach((image) => formData.append('images', image));
    return http.post<string[]>(`/Campaigns/${id}/images`, formData);
  },
  createContents: (id: string, contents: ContentsBodyType) => http.post(`/Campaigns/${id}/contents`, contents),
};

export default campaignsRequest;
