import { ERole } from './enum';

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

export default IUserManagement;
