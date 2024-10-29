import { EGender, EPlatform } from './enum';
import IImage from './image';
import { IPackage } from './offer';
import ITag from './tag';
import { ISocialProfile } from './utilities';

export interface IChannel extends ISocialProfile {
  id: string;
  platform: EPlatform;
  userName: string;
}

interface IInfluencer {
  id: string;
  userId: string;
  fullName: string;
  nickName: string;
  slug: string;
  avatar: string;
  gender: EGender;
  summarise: string;
  description?: string;
  address: string;
  phone: string;
  createdAt?: string;
  modifiedAt?: string;
  rateAverage: number;
  averagePrice: number;
  isPublish: boolean;
  channels: IChannel[];
  tags: ITag[];
  packages: IPackage[];
  images: IImage[];
}

export default IInfluencer;
