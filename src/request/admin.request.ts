import http from '@/lib/http';
import { BanBodyType } from '@/schema-validations/user.schema';

const adminRequest = {
  adminActionExport: () => http.get('/AdminAction/export'),
  adminBannedUserExport: () => http.get('/BanUser/export'),
  rejectReport: (id: string) => http.put(`/Report/${id}/reject`),
  approveReport: (id: string, body: BanBodyType) => http.put(`/Report/${id}/approve`, body),
};

export default adminRequest;
