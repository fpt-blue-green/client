import { ERole } from './enum';

interface IUser {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: ERole;
  accessToken: string;
  refreshToken: string;
  error?: string;
}

export default IUser;
