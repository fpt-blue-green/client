'use client';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { FaMoneyBill } from 'react-icons/fa6';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { fetchRequest } from '@/request';
const OverviewChart = () => {
  const { data } = fetchRequest.revenue();
  const chartData = data?.map((item) => ({
    month: item.label,
    revenue: item.value,
  }));

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
