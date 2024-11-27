import http from '@/lib/http';

const adminRequest = {
  adminActionExport: () => http.get('/AdminAction/export'),
  adminBannedUserExport: () => http.get('/BanUser/export'),
  rejectReport: (id: string) => http.put(`/Reports/${id}/reject`),
  delete: (id: string) => http.delete(`/Reports/${id}/reject`),
};

export default adminRequest;
