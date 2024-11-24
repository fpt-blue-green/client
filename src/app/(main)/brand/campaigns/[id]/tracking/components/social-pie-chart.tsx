'use client';

import NoData from '@/components/no-data';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { formats } from '@/lib/utils';
import { fetchRequest } from '@/request';
import { EPlatform, PlatformData } from '@/types/enum';
import { FC } from 'react';
import { Label, Pie, PieChart } from 'recharts';

interface SocialPieChartProps {
  id: string;
  total?: number;
}

const SocialPieChart: FC<SocialPieChartProps> = ({ id, total = 0 }) => {
  const { data } = fetchRequest.campaign.statisticalPlatform(id);

  const chartData = data?.map((i) => {
    return {
      ...i,
      platform: i.platform.toString(),
      fill: `var(--color-${i.platform})`,
    };
  });

  const chartConfig = {
    value: {
      label: 'Lượt tương tác',
    },
    [EPlatform.TitTok]: {
      label: PlatformData[EPlatform.TitTok].name,
      color: 'hsl(var(--foreground))',
    },
    [EPlatform.Instagram]: {
      label: PlatformData[EPlatform.Instagram].name,
      color: '#833AB4',
    },
    [EPlatform.YouTube]: {
      label: PlatformData[EPlatform.YouTube].name,
      color: '#FF0000',
    },
  } satisfies ChartConfig;

  return (
    <>
      {chartData && chartData.length > 0 ? (
        <ChartContainer config={chartConfig} className="max-w-full min-h-80">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />

            <Pie data={chartData} dataKey="value" nameKey="platform" innerRadius={60}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {formats.estimate(total)}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          tương tác
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
            <ChartLegend content={<ChartLegendContent nameKey="platform" />} className="flex-wrap gap-3" />
          </PieChart>
        </ChartContainer>
      ) : (
        <NoData description="Chưa có dữ liệu" />
      )}
    </>
  );
};

export default SocialPieChart;
