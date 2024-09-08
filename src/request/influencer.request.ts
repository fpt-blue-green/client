import http from '@/lib/http';
import { GeneralBodyType } from '@/schema-validations/influencer.schema';
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
  updateChannels: (channels: IChannel[]) => http.post('/Influencer/channels', channels),
};

export default influencerRequest;
