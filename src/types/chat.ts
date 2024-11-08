import IUser from './user';

interface IChat {
  chatId: string;
  chatName: string;
  chatImage?: string;
  sentAt: string;
  lastMessage: string;
  sender: IUser;
  isCampaign: boolean;
}

export default IChat;
