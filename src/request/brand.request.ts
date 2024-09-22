import http from '@/lib/http';
import { BasicBodyType } from '@/schema-validations/brand.schema';
import IBrand from '@/types/brand';

const brandRequest = {
  me: (noCache?: boolean) => http.get<IBrand>('/Brand', { cache: noCache ? 'no-cache' : 'default' }),
  updateGeneralInfo: (body: BasicBodyType) => http.put('Brand', body),
  changeCover: (coverImg: File) => {
    const formData = new FormData();
    formData.append('file', coverImg);
    return http.patch<string>('/Brand/upload/banner', formData);
  },
};

export default brandRequest;
