import { EPaymentStatus, EPaymentType } from './enum';
import IUser from './user';

export interface IPaymentHistory {
  amount: number;
  status: EPaymentStatus;
  type: EPaymentType;
  created: string;
}

export interface IPaymentManagement {
  id: string;
  user: IUser;
  netAmount: number;
  amount: number;
  status: EPaymentStatus;
  type: EPaymentType;
  bankInformation: string;
  createdAt: string;
  responseAt: string;
  adminMessage?: string;
}

export interface IPaymentResponse {
  partnerCode: string;
  orderId: string;
  //! requestId: string; keyword
  responseTime: string;
  amount: number;
  message: string;
  resultCode: number;
  payUrl: string;
  shortLink: string;
}
