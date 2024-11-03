import IUser from './user';

interface IMessage {
  id: string;
  sender: IUser;
  roomName: string;
  sendTime: string;
  campaignId: string;
  message: string;
}

export default IMessage;
