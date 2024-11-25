'use client';

import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
const chartData = [
  { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
  { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
  { browser: 'firefox', visitors: 287, fill: 'var(--color-firefox)' },
  { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
  { browser: 'other', visitors: 190, fill: 'var(--color-other)' },
];

const chartConfig = {
  chrome: {
    label: 'Chrome',
    color: 'hsl(347 77% 50%)',
  },
  safari: {
    label: 'Safari',
    color: 'hsl(352 83% 91%)',
  },
  firefox: {
    label: 'Firefox',
    color: 'hsl(350 80% 72%)',
  },
  edge: {
    label: 'Edge',
    color: 'hsl(351 83% 82%)',
  },
  other: {
    label: 'Other',
    color: 'hsl(349 77% 62%)',
  },
} satisfies ChartConfig;

export function PieChartData() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <div className="flex flex-col border-none gap-8">
      <div className="items-center pb-0">
        <h5 className="text-center font-semibold">Thống kê các công việc của hệ thống</h5>
        <p className="text-center text-muted-foreground">Các trạng thái - năm 2024</p>
      </div>
      <div className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="visitors" nameKey="browser" innerRadius={60} strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          Visitors
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
          Thể hiện toàn bộ trạng thái của các đầu việc năm nay
        </div>
      </div>
    </div>
  );
}
