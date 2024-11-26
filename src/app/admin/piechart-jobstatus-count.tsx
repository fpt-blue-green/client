'use client';

import { Label, Pie, PieChart } from 'recharts';

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@/lib/http';
import { IPieChartDate } from '@/types/analytics';

export const PieChartJobStatus = () => {
  const { data: items } = useSWRImmutable<IPieChartDate[]>('/AdminStatistic/jobStatusCounts', fetcher);
  if (!items) {
    return;
  }

  const chartData = [
    { status: 'pendingVerification', values: items[0].value, fill: 'var(--color-pendingVerification)' },
    { status: 'approved', values: items[1].value, fill: 'var(--color-approved)' },
    { status: 'inProcess', values: items[2].value, fill: 'var(--color-inProcess)' },
    { status: 'completed', values: items[3].value, fill: 'var(--color-completed)' },
    { status: 'failed', values: items[4].value, fill: 'var(--color-failed)' },
    { status: 'canceled', values: items[5].value, fill: 'var(--color-canceled)' },
  ];

  const chartConfig = {
    pendingVerification: {
      label: items[0].label,
      color: 'hsl(221.2 83.2% 53.3%)',
    },
    approved: {
      label: items[1].label,
      color: 'hsl(212 95% 68%)',
    },
    inProcess: {
      label: items[2].label,
      color: 'hsl(216 92% 60%)',
    },
    completed: {
      label: items[3].label,
      color: 'hsl(351 83% 82%)',
    },
    failed: {
      label: items[4].label,
      color: 'hsl(212 97% 87%)',
    },
    canceled: {
      label: items[5].label,
      color: 'hsl(210 98% 78%)',
    },
  } satisfies ChartConfig;
  if (!items) {
    return;
  }
  const totalJobStatus = items.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="flex flex-col border-none gap-8">
      <div className="items-center pb-0">
        <h5 className="text-center font-semibold">Thống kê toàn bộ trạng thái công việc </h5>
        <p className="text-center text-muted-foreground">Các trạng thái - năm 2024</p>
      </div>
      <div className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="values" nameKey="status" innerRadius={60} strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {totalJobStatus.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          Trạng thái
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>
      <div className="flex-col gap-2 text-sm">
        <div className="text-center leading-none text-muted-foreground">
          Phân tích toàn bộ trạng thái của hệ thống năm nay
        </div>
      </div>
    </div>
  );
};
