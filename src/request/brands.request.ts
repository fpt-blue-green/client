import http from '@/lib/http';
import IBrand from '@/types/brand';

const brandsRequest = {
  getBrandById: (id: string) => http.get<IBrand>(`/Brands/${id}`, { noToken: true, next: { revalidate: 60 } }),
};

export default brandsRequest;
