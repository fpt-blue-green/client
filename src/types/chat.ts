import IUser from './user';

interface IChat {
  chatId: string;
  chatName: string;
  chatImage?: string;
  sentAt?: string;
  lastMessage?: string;
  sender?: IUser;
  isCampaign: boolean;
  campaignId?: string;
}

export default IChat;
