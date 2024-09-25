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
  websiteUrl?: string;
  facebookUrl?: string;
  tiktokUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
}

export default IBrand;
