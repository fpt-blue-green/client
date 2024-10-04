import IUser from './user';

interface IFeedback {
  id: string;
  influencerId: string;
  rating: number;
  content?: string;
  createdAt: string;
  modifiedAt: string;
  user: IUser;
}

export default IFeedback;
