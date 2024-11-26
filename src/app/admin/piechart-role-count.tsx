'use client';

import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
const items = [
  {
    label: 'Nhà sáng tạo nội dung',
    value: 9,
  },
  {
    label: 'Nhãn hàng',
    value: 2,
  },
  {
    label: 'Nhãn hàng trả phí',
    value: 3,
  },
  {
    label: 'Quản trị viên',
    value: 3,
  },
];

const chartData = [
  { role: 'influencer', values: items[0].value, fill: 'var(--color-influencer)' },
  { role: 'brand', values: items[1].value, fill: 'var(--color-brand)' },
  { role: 'premiumBrand', values: items[2].value, fill: 'var(--color-premiumBrand)' },
  { role: 'admin', values: items[3].value, fill: 'var(--color-admin)' },
];

const chartConfig = {
  influencer: {
    label: items[0].label,
    color: 'hsl(347 77% 50%)',
  },
  brand: {
    label: items[1].label,
    color: 'hsl(352 83% 91%)',
  },
  premiumBrand: {
    label: items[2].label,
    color: 'hsl(350 80% 72%)',
  },
  admin: {
    label: items[3].label,
    color: 'hsl(351 83% 82%)',
  },
} satisfies ChartConfig;

export const PieChartsRoleCount = () => {
  const totalRoles = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.values, 0);
  }, []);

  return (
    <div className="flex flex-col border-none gap-8">
      <div className="items-center pb-0">
        <h5 className="text-center font-semibold">Thống kê toàn bộ vai trò của hệ thống</h5>
        <p className="text-center text-muted-foreground">Các vai trò - năm 2024</p>
      </div>
      <div className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="values" nameKey="role" innerRadius={60} strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {totalRoles.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          Vai trò
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
          Thể hiện toàn bộ vai trò của hệ thống năm nay
        </div>
      </div>
    </div>
  );
};
