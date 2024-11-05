import http from '@/lib/http';
import { ReviewBodyType } from '@/schema-validations/influencer.schema';
import IInfluencer from '@/types/influencer';

const influencersRequest = {
  getInfluencerBySlug: (slug: string) =>
    http.get<IInfluencer>(`/Influencers/${slug}`, { noToken: true, next: { revalidate: 30 } }),
  sendFeedback: (id: string, body: ReviewBodyType) => http.post(`/Influencers/${id}/feedbacks`, body),
  updateFeedback: (id: string, feedbackId: string, body: ReviewBodyType) =>
    http.put(`/Influencers/${id}/feedbacks/${feedbackId}`, body),
  deleteFeedback: (id: string, feedbackId: string) => http.delete(`/Influencers/${id}/feedbacks/${feedbackId}`),
  countFeedback: (id: string) => http.get<number>(`/Influencers/${id}/feedbacks/count`, { noToken: true }),
};

export default influencersRequest;
