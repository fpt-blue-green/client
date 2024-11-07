import IUser from './user';

interface IMessage {
  id: string;
  sender: IUser;
  roomName: string;
  sentAt: string;
  modifiedAt: string;
  campaignId: string;
  content: string;
}

export default IMessage;
