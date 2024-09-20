import http from '@/lib/http';
import { BasicBodyType } from '@/schema-validations/brand.schema';

const brandRequest = {
  updateGeneralInfo: (body: BasicBodyType) => http.put('Brand', body),
  changeCover: (coverImg: File) => {
    const formData = new FormData();
    formData.append('file', coverImg);
    return http.patch<string>('/Brand/upload/banner', formData);
  },
};

export default brandRequest;
