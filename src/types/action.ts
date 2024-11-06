import { EAdminActionType } from './enum';
import IUser from './user';

interface IAdminAction {
  id: string;
  userId: string;
  actionType: EAdminActionType;
  actionDetails: string;
  actionDate: string;
  objectType: string;
  user: IUser;
}

export default IAdminAction;
