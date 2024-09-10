import http from '@/lib/http';
import { GeneralBodyType, PackagesBodyType } from '@/schema-validations/influencer.schema';
import { EPlatform } from '@/types/enum';
import IInfluencer, { IChannel } from '@/types/influencer';

const influencerRequest = {
  me: () => http.get<IInfluencer>('/Influencer'),
  updateGeneralInfo: (body: GeneralBodyType) => http.put<string>('/Influencer', body),
  changeAvatar: (avatar: File) => {
    const formData = new FormData();
    formData.append('file', avatar);
    return http.patch<string>('/User/avatar', formData);
  },
  getChannels: () => http.get<IChannel[]>('/Influencer/channelUsername'),
  updateChannels: (channels: { platform: EPlatform; userName: string }[]) =>
    http.post('/Influencer/channels', channels),
  selectTags: (tags: string[]) => http.post<string>('/Influencer/tags', tags),
  updatePackages: (packages: PackagesBodyType['packages']) => http.post('/Influencer/packages', packages),
  uploadImages: (imageIds: string[], images: File[]) => {
    const formData = new FormData();
    imageIds.forEach((id) => formData.append('imageIds', id));
    images.forEach((image) => formData.append('images', image));
    return http.post<string[]>('/Influencer/images', formData);
  },
};

export default influencerRequest;
