"use client";

import type { DashboardRange } from "../dashboard-utils";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type ChartPoint = {
  label: string;
  total: number;
};

type Props = {
  chartData: ChartPoint[];
  range: DashboardRange;
  setRange: (value: DashboardRange) => void;
  height?: number;
};

export default function SalesChart({
  chartData,
  range,
  setRange,
  height = 320,
}: Props) {
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <ToggleGroup
          type="single"
          value={range}
          onValueChange={(value) => {
            if (value === "7d" || value === "3m" || value === "1y") {
              setRange(value);
            }
          }}
          className="w-full justify-start"
        >
          <ToggleGroupItem value="7d">Last 7 Days</ToggleGroupItem>

          <ToggleGroupItem value="3m">Last 3 Months</ToggleGroupItem>

          <ToggleGroupItem value="1y">This Year</ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="w-full min-w-0">
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="salesWave" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity={0.35} />
                <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              opacity={0.08}
              vertical={false}
            />

            <XAxis
              dataKey="label"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₱${Number(value).toLocaleString()}`}
            />

            <Tooltip
              formatter={(value) => [
                `₱${Number(value).toLocaleString()}`,
                "Sales",
              ]}
              cursor={{
                stroke: "hsl(var(--border))",
                strokeWidth: 1,
              }}
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "10px",
                fontSize: "12px",
              }}
            />

            <Area
              type="monotone"
              dataKey="total"
              stroke="currentColor"
              strokeWidth={2}
              fill="url(#salesWave)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
