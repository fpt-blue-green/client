import http from '@/lib/http';
import IMetricTrend from '@/types/analytics';

const analyticsRequest = {
  getMetricTrends: () => {
    http.get<IMetricTrend[]>('/AdminStatistic/monthlyMetricsTrend');
  },
};

export default analyticsRequest;
