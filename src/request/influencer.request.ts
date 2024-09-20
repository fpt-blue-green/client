import http from '@/lib/http';
import { ChannelBodyType, GeneralBodyType, PackageBodyType } from '@/schema-validations/influencer.schema';
import IInfluencer from '@/types/influencer';

const influencerRequest = {
  me: () => http.get<IInfluencer>('/Influencer'),
  updateGeneralInfo: (body: GeneralBodyType) => http.put<string>('/Influencer', body),
  updateChannels: (channels: ChannelBodyType[]) => http.post('/Influencer/channels', channels),
  deleteChannel: (id: string) => http.delete(`/Influencer/channels/${id}`),
  selectTags: (tags: string[]) => http.post<string>('/Influencer/tags', tags),
  updatePackages: (packages: PackageBodyType[]) => http.post('/Influencer/packages', packages),
  uploadImages: (imageIds: string[], images: File[]) => {
    const formData = new FormData();
    imageIds.forEach((id) => formData.append('imageIds', id));
    images.forEach((image) => formData.append('images', image));
    return http.post<string[]>('/Influencer/images', formData);
  },
};

export default influencerRequest;
