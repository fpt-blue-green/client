import http from '@/lib/http';
import { ForgotPasswordBodyType, LoginBodyType, RegisterBodyType } from '@/schema-validations/auth.schema';
import { ChangePasswordBodyType } from '@/schema-validations/user.schema';
import { EVerifyAction } from '@/types/enum';

const authRequest = {
  register: (body: RegisterBodyType) => http.post('/Auth/register', body, { noToken: true }),
  login: (body: LoginBodyType) => http.post('/Auth/login', body, { noToken: true }),
  refreshToken: (token: string) => http.post('/Auth/refreshToken', { token }, { noToken: true }),
  changePassword: (body: ChangePasswordBodyType) => http.put('/Auth/changePass', body, { noToken: true }),
  forgotPassword: (body: ForgotPasswordBodyType) => http.put('/Auth/forgotPass', body, { noToken: true }),
  logout: (refreshToken: string) => http.post('/Auth/logout', { token: refreshToken }, { noToken: true }),
  verify: (action: EVerifyAction, token: string) =>
    http.post<boolean>('/Auth/verify', { action, token }, { noToken: true }),
};

export default authRequest;
