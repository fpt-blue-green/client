import http from '@/lib/http';
import { ChangePasswordBodyType } from '@/schema-validations/user.schema';
import { IPaymentResponse } from '@/types/payment';

const userRequest = {
  changePassword: (body: ChangePasswordBodyType) => http.put('/Auth/changePass', body),
  changeAvatar: (avatar: File) => {
    const formData = new FormData();
    formData.append('file', avatar);
    return http.patch<string>('/User/avatar', formData);
  },
  deposit: (redirectUrl: string, amount: number) =>
    http.post<IPaymentResponse>('/Payment/deposit/CreateCollectionLink', { redirectUrl, amount }),
};

export default userRequest;
