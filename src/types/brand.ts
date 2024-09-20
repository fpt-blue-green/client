interface IBrand {
  id: string;
  userId: string;
  name: string;
  address: string;
  isPremium: boolean;
  avatar: string;
  coverImg?: string;
  description?: string;
  createdAt?: Date;
  modifiedAt?: Date;
  websiteLink?: string;
  facebookLink?: string;
  tiktokLink?: string;
  instagramLink?: string;
  youtubeLink?: string;
}

export default IBrand;
