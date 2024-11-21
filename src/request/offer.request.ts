import http from '@/lib/http';
import { OfferBodyType, ReofferBodyType, JobLinksBodyType } from '@/schema-validations/offer.schema';

const offerRequest = {
  createOffer: (body: OfferBodyType) => http.post('/Offer', body),
  reoffer: (id: string, body: ReofferBodyType) => http.put(`/Offer/${id}/reoffer`, body),
  approveOffer: (id: string) => http.put(`/Offer/${id}/approveOffer`),
  rejectOffer: (id: string) => http.put(`/Offer/${id}/rejectOffer`),
  payOffer: (id: string) => http.put(`/Job/${id}/payment`),
  submitLinks: (id: string, body: JobLinksBodyType) =>
    http.put(`/Job/${id}/link`, { link: body.links.map((l) => l.value) }),
  complete: (id: string) => http.put(`/Job/${id}/complete`),
  fail: (id: string) => http.put(`/Job/${id}/fail`),
};

export default offerRequest;
