import http from '@/lib/http';

const exportRequest = {
  adminActionExport: () => {
    http.get('/AdminAction/export');
  },
};

export default exportRequest;
