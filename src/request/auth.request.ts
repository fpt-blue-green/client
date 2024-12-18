import http from '@/lib/http';
import { ForgotPasswordBodyType, LoginBodyType, RegisterBodyType } from '@/schema-validations/auth.schema';
import { EVerifyAction } from '@/types/enum';
import IUser from '@/types/user';

const authRequest = {
  register: (body: RegisterBodyType) => http.post('/Auth/register', body, { noToken: true }),
  login: (body: LoginBodyType, userAgent: string) =>
    http.post<IUser>('/Auth/login', body, { noToken: true, headers: { 'User-Agent': userAgent } }),
  refreshToken: (refreshToken: string) => http.post('/Auth/refreshToken', { refreshToken }, { noToken: true }),
  forgotPassword: (body: ForgotPasswordBodyType) => http.put('/Auth/forgotPass', body, { noToken: true }),
  logout: (refreshToken: string) => http.post('/Auth/logout', { token: refreshToken }, { noToken: true }),
  verify: (action: EVerifyAction, token: string) =>
    http.post<boolean>('/Auth/verify', { action, token }, { noToken: true }),
  registerOthers: (body: any) => http.post('/Auth/registerwiththirdparty', body),
};

export default authRequest;
