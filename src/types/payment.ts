import { EPaymentStatus, EPaymentType } from './enum';

export interface IPaymentHistory {
  amount: number;
  status: EPaymentStatus;
  type: EPaymentType;
  created: string;
}
