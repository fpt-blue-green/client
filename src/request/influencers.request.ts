import http from '@/lib/http';
import IInfluencer from '@/types/influencer';

const influencersRequest = {
  getInfluencerBySlug: (slug: string) => http.get<IInfluencer>(`/Influencers/${slug}`, { noToken: true }),
};

export default influencersRequest;
