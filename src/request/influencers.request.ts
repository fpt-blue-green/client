import http from '@/lib/http';
import IInfluencer from '@/types/influencer';

const influencersRequest = {
  getInfluencerBySlug: (slug: string) =>
    http.get<IInfluencer>(`/Influencers/${slug}`, { noToken: true, next: { revalidate: 60 } }),
};

export default influencersRequest;
