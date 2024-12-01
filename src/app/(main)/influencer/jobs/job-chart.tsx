'use client';

import Paper from '@/components/custom/paper';
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
import { EJobStatus } from '@/types/enum';
import { useMemo, useState } from 'react';
import { Label, Pie, PieChart, Sector } from 'recharts';

const JobChart = () => {
  const { data } = fetchRequest.job.statistical();
  const [activeIndex, setActiveIndex] = useState<number>();

  const total = useMemo(() => {
    if (data) {
      return data.reduce((acc, value) => acc + value.count, 0);
    }
  }, [data]);

  const chartData = data?.map((i) => {
    return {
      ...i,
      platform: i.jobStatus.toString(),
      fill: `var(--color-${i.jobStatus})`,
    };
  });

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    return (
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 15} // Tăng kích thước khi hover
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    );
  };

  const chartConfig = {
    count: {
      label: 'Số công việc',
    },
    [EJobStatus.Pending]: {
      color: 'hsl(var(--warning))',
      label: 'Chờ xác nhận',
    },
    [EJobStatus.Approved]: {
      color: 'hsl(var(--primary))',
      label: 'Chấp thuận',
    },
    [EJobStatus.InProgress]: {
      color: 'hsl(var(--info))',
      label: 'Đang thực hiện',
    },
    [EJobStatus.Completed]: {
      color: 'hsl(var(--success))',
      label: 'Hoàn thành',
    },
    [EJobStatus.Failed]: {
      color: 'hsl(var(--destructive))',
      label: 'Không đạt',
    },
    [EJobStatus.NotCreated]: {
      color: 'hsl(var(--foreground))',
      label: 'Bị huỷ bỏ',
    },
  } satisfies ChartConfig;

  return (
    <Paper>
      <>
        {chartData && chartData.length > 0 ? (
          <ChartContainer config={chartConfig} className="max-w-full min-h-80">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="jobStatus"
                innerRadius={70}
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                onMouseEnter={(_, index) => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(undefined)}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                          <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                            {formats.estimate(total || 0)}
                          </tspan>
                          <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                            công việc
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
    </Paper>
  );
};

export default JobChart;
