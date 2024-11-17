import http from '@/lib/http';

const adminRequest = {
  adminActionExport: () => http.get('/AdminAction/export'),
  adminBannedUserExport: () => http.get('/BanUser/export'),
};

export default adminRequest;
