import http from '@/lib/http';

const adminRequest = {
  adminActionExport: () => http.get('/AdminAction/export'),
};

export default adminRequest;
