import http from '@/lib/http';

const influencerRequest = {
  changeAvatar: (avatar: File) => {
    const formData = new FormData();
    formData.append('file', avatar);
    return http.patch<string>('/User/avatar', formData);
  },
};

export default influencerRequest;
