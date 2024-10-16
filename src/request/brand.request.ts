import http from '@/lib/http';
import { BasicBodyType, SocialBodyType } from '@/schema-validations/brand.schema';
import IBrand from '@/types/brand';

const brandRequest = {
  me: (noCache?: boolean) => http.get<IBrand>('/Brand', { cache: noCache ? 'no-cache' : 'default' }),
  updateGeneralInfo: (body: BasicBodyType) => http.put('Brand', body),
  changeCover: (coverImg: File) => {
    const formData = new FormData();
    formData.append('file', coverImg);
    return http.patch<string>('/Brand/CoverImg', formData);
  },
  addSocialLink: (body: SocialBodyType) => http.put('/Brand/social', body),
  favorite: (influencerId: string) => http.post(`/Brand/favorites/${influencerId}`),
  unfavorite: (influencerId: string) => http.delete(`/Brand/favorites/influencer/${influencerId}`),
};

export default brandRequest;
