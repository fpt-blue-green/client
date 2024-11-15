import http from '@/lib/http';
import { BanBodyType, ChangePasswordBodyType, GeneralBodyType } from '@/schema-validations/user.schema';
import IUser from '@/types/user';
import { IPaymentResponse } from '@/types/payment';

const userRequest = {
  changePassword: (body: ChangePasswordBodyType) => http.put('/Auth/changePass', body),
  changeAvatar: (avatar: File) => {
    const formData = new FormData();
    formData.append('file', avatar);
    return http.patch<string>('/User/avatar', formData);
  },
  get: () => http.get<IUser>('/User'),
  delete: (id: string) => http.post(`/User/delete?userId=${id}`),
  ban: (id: string, body: BanBodyType) => http.post(`/BanUser/${id}/ban`, body),
  unBan: (id: string, body: BanBodyType) => http.post(`/BanUser/${id}/unBan`, body),
  // Chưa Implement APIs
  addUser: (body: GeneralBodyType) => http.post('/admin/Users', body),
  updateUser: (id: string, body: GeneralBodyType) => http.put(`/admin/Users/${id}`, body),
  deposit: (redirectUrl: string, amount: number) =>
    http.post<IPaymentResponse>('/Payment/deposit/CreateCollectionLink', { redirectUrl, amount }),
};

export default userRequest;
