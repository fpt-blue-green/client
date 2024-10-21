'use client';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { FaMoneyBill } from 'react-icons/fa6';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ChartLegend, ChartLegendContent } from '@/components/ui/chart';

const OverviewChart = () => {
  const chartData = [
    { month: 'Tháng 1', revenue: 10 },
    { month: 'Tháng 2', revenue: 200 },
    { month: 'Tháng 3', revenue: 120 },
    { month: 'Tháng 4', revenue: 190 },
    { month: 'Tháng 5', revenue: 130 },
    { month: 'Tháng 6', revenue: 140 },
    { month: 'Tháng 7', revenue: 80 },
    { month: 'Tháng 8', revenue: 200 },
    { month: 'Tháng 9', revenue: 50 },
    { month: 'Tháng 10', revenue: 80 },
    { month: 'Tháng 11', revenue: 120 },
    { month: 'Tháng 12', revenue: 190 },
  ];

  const chartConfig = {
    revenue: {
      label: 'Doanh Thu (triệu đồng) ',
      icon: FaMoneyBill,
      color: '#dd5e89',
    },
  } satisfies ChartConfig;

  return (
    <>
      <h3 className="font-semibold mb-12">Tổng Quan</h3>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(5, 9)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
        </BarChart>
      </ChartContainer>
    </>
  );
};

export default OverviewChart;
