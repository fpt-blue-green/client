import http from '@/lib/http';

const paymentRequest = {
  updatePremium: (body: any) => http.post('/Payment/updatePremium/CreateCollectionLink', body),
};

export default paymentRequest;
