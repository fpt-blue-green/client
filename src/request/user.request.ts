import http from '@/lib/http';
import { ChangePasswordBodyType } from '@/schema-validations/user.schema';

const userRequest = {
  changePassword: (body: ChangePasswordBodyType) => http.put('/Auth/changePass', body),
  changeAvatar: (avatar: File) => {
    const formData = new FormData();
    formData.append('file', avatar);
    return http.patch<string>('/User/avatar', formData);
  },
};

export default userRequest;
