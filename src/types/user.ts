import { ERole } from './enum';

type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: ERole;
  accessToken: string;
  refreshToken: string;
};

export default User;
