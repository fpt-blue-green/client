import { EPaymentStatus, EPaymentType } from './enum';

export interface IPaymentHistory {
  amount: number;
  status: EPaymentStatus;
  type: EPaymentType;
  created: string;
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
