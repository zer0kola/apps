'use client';

import * as React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export interface DataPoint {
  date: string;
  price: number;
}

interface LineChartProps {
  data: DataPoint[];
  yAxisDomain?: [number, number];
}

export const LineChart = ({
  data,
  yAxisDomain = [60000, 120000],
}: LineChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={data}>
        <XAxis
          dataKey="date"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          domain={yAxisDomain}
          tickFormatter={(value: number) => `${value}`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg bg-background p-2 shadow-md">
                  <p className="text-sm">
                    fare: {payload[0]?.value?.toLocaleString() ?? 0}원
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <Line
          type="monotone"
          dataKey="price"
          stroke="#2563eb"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};
