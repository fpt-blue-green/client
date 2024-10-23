import { EContentType, EOfferStatus, EPlatform, ERole } from './enum';

export interface IContent {
  id: string;
  platform: EPlatform;
  contentType: EContentType;
  quantity: number;
  price: number;
  description?: string;
}

export interface IPackage extends IContent {
  duration?: number;
}

export default interface IOffer extends IPackage {
  targetReaction: number;
  from: ERole.Brand | ERole.Influencer;
  status: EOfferStatus;
  createdAt?: string;
}
