import http from '@/lib/http';
import { BasicBodyType, ContentBodyType } from '@/schema-validations/campaign.schema';
import ICampaign from '@/types/campaign';
import IUser from '@/types/user';

const campaignsRequest = {
  getCampaignById: (id: string) =>
    http.get<ICampaign>(`/Campaigns/${id}`, { noToken: false, next: { revalidate: 30 } }),
  createCampaign: (body: BasicBodyType) =>
    http.post<string>('/Campaigns', { ...body, startDate: body.dates[0], endDate: body.dates[1] }),
  updateCampaign: (id: string, body: BasicBodyType) =>
    http.put<string>(`/Campaigns/${id}`, { ...body, startDate: body.dates[0], endDate: body.dates[1] }),
  addTags: (id: string, tagIds: string[]) => http.post(`/Campaigns/${id}/tags`, tagIds),
  uploadImages: (id: string, imageIds: string[], images: File[]) => {
    const formData = new FormData();
    imageIds.forEach((id) => formData.append('imageIds', id));
    images.forEach((image) => formData.append('images', image));
    return http.post<string[]>(`/Campaigns/${id}/images`, formData);
  },
  createContents: (id: string, contents: ContentBodyType[]) => http.post(`/Campaigns/${id}/contents`, contents),
  delete: (id: string) => http.delete(`/Campaigns/${id}`),
  publish: (id: string) => http.put(`/Campaigns/${id}/publish`),
  start: (id: string) => http.put(`/Campaigns/${id}/start`),
  end: (id: string) => http.put(`/Campaigns/${id}/end`),
  getChat: (id: string) => http.get<{ id: string }>(`/Campaigns/${id}/chat`),
  createChat: (id: string) => http.post<{ id: string }>('/Contact/campaignChat/create', { campaignId: id }),
  participants: (id: string) => http.get<IUser[]>(`/Campaigns/${id}/participant`),
};

export default campaignsRequest;
