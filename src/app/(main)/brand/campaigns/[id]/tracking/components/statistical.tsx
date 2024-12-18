'use client';

import NoData from '@/components/no-data';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { formats } from '@/lib/utils';
import { fetchRequest } from '@/request';
import { FC } from 'react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

interface StatisticalProps {
  id: string;
  jobId?: string;
  link?: string;
}

const chartConfig: ChartConfig = {
  totalReaction: {
    label: 'Lượt tương tác:',
    color: 'hsl(var(--chart-1))',
  },
};

const Statistical: FC<StatisticalProps> = ({ id, jobId, link }) => {
  const { data } = fetchRequest.campaign.statisticalChart(id);
  const { data: jobData } = fetchRequest.job.statisticalChart(jobId, link);

  const chartData = jobId ? jobData : data;

  return (
    <>
      {chartData && chartData.length > 0 ? (
        <ChartContainer config={chartConfig} className="min-h-60">
          <LineChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="date" tickMargin={8} tickFormatter={(value: string) => value.slice(0, 5)} />
            <YAxis
              dataKey="totalReaction"
              axisLine={false}
              tickLine={false}
              tickFormatter={(value: number) => formats.estimate(value)}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              dataKey="totalReaction"
              type="monotone"
              stroke="var(--color-totalReaction)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      ) : (
        <NoData description="Chưa có dữ liệu" />
      )}
    </>
  );
};

export default Statistical;
