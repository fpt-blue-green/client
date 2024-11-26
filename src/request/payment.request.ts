import config from '@/config';
import http from '@/lib/http';
import { WithdrawBodyType } from '@/schema-validations/user.schema';
import { IPaymentResponse } from '@/types/payment';

const paymentRequest = {
  updatePremium: (body: any) => http.post('/Payment/updatePremium/CreateCollectionLink', body),
  deposit: (redirectUrl: string, amount: number) =>
    http.post<IPaymentResponse>('/Payment/deposit/CreateCollectionLink', { redirectUrl, amount }),
  withdraw: (body: WithdrawBodyType) => http.post('/Payment/withdraw', body),
  lookBank: (bank: string, account: string) =>
    http.post<{ success: boolean; data: { ownerName: string } }>(
      'https://api.httzip.com/api/bank/id-lookup-prod',
      { bank, account },
      { headers: { 'x-api-key': config.env.BANK_LOOKUP_KEY, 'x-api-secret': config.env.BANK_LOOKUP_SECRET } },
    ),
};

export default paymentRequest;
