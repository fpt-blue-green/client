import http from '@/lib/http';
import { Channel } from '@/types/influencer';

const influencerRequest = {
  changeAvatar: (avatar: File) => {
    const formData = new FormData();
    formData.append('file', avatar);
    return http.patch<string>('/User/avatar', formData);
  },
  getChannels: () => http.get<Channel[]>('/Influencer/channelUsername'),
  updateChannels: (channels: Channel[]) => http.post('/Influencer/channels', channels),
};

export default influencerRequest;
