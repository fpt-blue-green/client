import http from '@/lib/http';
import { ForgotPasswordBodyType, LoginBodyType, RegisterBodyType } from '@/schema-validations/auth.schema';
import { ChangePasswordBodyType } from '@/schema-validations/user.schema';
import { EVerifyAction } from '@/types/enum';

const authRequest = {
  register: (body: RegisterBodyType) => http.post('/Auth/register', body),
  login: (body: LoginBodyType) => http.post('/Auth/login', body),
  refreshToken: (token: string) => http.post('/Auth/refreshToken', { token }),
  changePassword: (body: ChangePasswordBodyType) => http.put('/Auth/changePass', body),
  forgotPassword: (body: ForgotPasswordBodyType) => http.put('/Auth/forgotPass', body),
  logout: (refreshToken: string) => http.post('/Auth/logout', { token: refreshToken }),
  verify: (action: EVerifyAction, token: string) => http.get(`/Auth/verify?action=${action}&token=${token}`),
};

export default authRequest;
