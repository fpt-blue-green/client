import http from '@/lib/http';
import { LoginBodyType } from '@/schema-validations/auth.schema';
import { ChangePasswordBodyType } from '@/schema-validations/influencer-account.schema';

const authRequest = {
  login: (body: LoginBodyType) => http.post('/Auth/login', body),
  refreshToken: (token: string) => http.post('/Auth/refreshToken', { token }),
  forgotPassword: (body: ChangePasswordBodyType) => http.put('/Auth/changePass', body),
  logout: (refreshToken: string) => http.post('/Auth/logout', { token: refreshToken }),
};

export default authRequest;
