import IUser from './user';

interface IAdminAction {
  id: string;
  userId: string;
  actionType: number;
  actionDetails: string;
  actionDate: string;
  objectType: string;
  user: IUser;
}

export default IAdminAction;
