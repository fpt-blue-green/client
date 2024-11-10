import http from '@/lib/http';
import { ChangePasswordBodyType, GeneralBodyType } from '@/schema-validations/user.schema';
import IUser from '@/types/user';

const userRequest = {
  changePassword: (body: ChangePasswordBodyType) => http.put('/Auth/changePass', body),
  changeAvatar: (avatar: File) => {
    const formData = new FormData();
    formData.append('file', avatar);
    return http.patch<string>('/User/avatar', formData);
  },
  get: () => http.get<IUser>('/User'),
  delete: (id: string) => http.delete(`/User/delete/${id}`),
  // Chưa Implement APIs
  addUser: (body: GeneralBodyType) => http.post('/admin/Users', body),
  updateUser: (id: string, body: GeneralBodyType) => http.put(`/admin/Users/${id}`, body),
};

export default userRequest;
