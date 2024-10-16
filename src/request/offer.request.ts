import http from '@/lib/http';
import { OfferBodyType } from '@/schema-validations/offer.schema';

const offerRequest = {
  createOffer: (body: OfferBodyType) => http.post('/Offer', body),
};

export default offerRequest;
