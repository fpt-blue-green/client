import { ERole } from './enum';
import IUser from './user';

interface IUserManagement {
  id: string;
  email: string;
  displayName: string;
  avatar: string;
  role: ERole;
  wallet: number;
  provider: number;
  createdAt: string;
  modifiedAt: string;
  isDeleted: boolean;
  isBanned: boolean;
}

export interface IBanUserManagement {
  id: string;
  userId: string;
  banDate: string;
  reason: string;
  unbanDate: string;
  user: IUser;
  bannedBy: IUser;
}

export default IUserManagement;
