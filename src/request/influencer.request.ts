import http from '@/lib/http';
import { IChannel } from '@/types/influencer';

const influencerRequest = {
  changeAvatar: (avatar: File) => {
    const formData = new FormData();
    formData.append('file', avatar);
    return http.patch<string>('/User/avatar', formData);
  },
  getChannels: () => http.get<IChannel[]>('/Influencer/channelUsername'),
  updateChannels: (channels: IChannel[]) => http.post('/Influencer/channels', channels),
};

export default influencerRequest;
