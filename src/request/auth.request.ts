import http from '@/lib/http';
import { ChangePasswordBodyType } from '@/schema-validations/influencer-account.schema';

const authRequest = {
  forgotPassword: (body: ChangePasswordBodyType) => http.put('/Auth/changePass', body),
};

export default authRequest;
