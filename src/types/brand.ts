interface IBrand {
  id: string;
  userId: string;
  name: string;
  address: string;
  isPremium: boolean;
  avatar: string;
  coverImg?: string;
  description?: string;
  createdAt?: string;
  modifiedAt?: string;
  websiteUrl?: string;
  facebookUrl?: string;
  tiktokUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  premiumValidTo?: string;
}

export default IBrand;
