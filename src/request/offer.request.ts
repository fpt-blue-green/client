import http from '@/lib/http';
import { OfferBodyType, ReofferBodyType } from '@/schema-validations/offer.schema';

const offerRequest = {
  createOffer: (body: OfferBodyType) => http.post('/Offer', body),
  reoffer: (id: string, body: ReofferBodyType) => http.put(`/Offer/${id}/reoffer`, body),
  approveOffer: (id: string) => http.put(`/Offer/${id}/approveOffer`),
  rejectOffer: (id: string) => http.put(`/Offer/${id}/rejectOffer`),
  payOffer: (id: string) => http.put(`/Job/${id}/payment`),
};

export default offerRequest;
