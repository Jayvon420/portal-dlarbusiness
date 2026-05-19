"use client";

import { useMemo, useState } from "react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type Sale = {
  id: string;
  amount: number;
  date: Date;
};

type Props = {
  sales: Sale[];
  height?: number;
};

export default function SalesChart({ sales, height = 320 }: Props) {
  const [range, setRange] = useState("7d");

  const chartData = useMemo(() => {
    const now = new Date();

    // =========================
    // LAST 7 DAYS
    // =========================
    if (range === "7d") {
      return Array.from({ length: 7 }, (_, index) => {
        const d = new Date();

        d.setDate(now.getDate() - (6 - index));

        const label = d.toLocaleDateString("en-US", {
          weekday: "short",
        });

        const total = sales
          .filter((sale) => {
            const saleDate = new Date(sale.date);

            return saleDate.toDateString() === d.toDateString();
          })
          .reduce((sum, sale) => sum + Number(sale.amount), 0);

        return {
          label,
          total,
        };
      });
    }

    // =========================
    // LAST 3 MONTHS
    // =========================
    if (range === "3m") {
      return Array.from({ length: 3 }, (_, index) => {
        const d = new Date(now.getFullYear(), now.getMonth() - (2 - index), 1);

        const label = d.toLocaleDateString("en-US", {
          month: "short",
        });

        const total = sales
          .filter((sale) => {
            const saleDate = new Date(sale.date);

            return (
              saleDate.getMonth() === d.getMonth() &&
              saleDate.getFullYear() === d.getFullYear()
            );
          })
          .reduce((sum, sale) => sum + Number(sale.amount), 0);

        return {
          label,
          total,
        };
      });
    }

    // =========================
    // YEARLY (JAN-DEC)
    // =========================
    return Array.from({ length: 12 }, (_, index) => {
      const d = new Date(now.getFullYear(), index, 1);

      const label = d.toLocaleDateString("en-US", {
        month: "short",
      });

      const total = sales
        .filter((sale) => {
          const saleDate = new Date(sale.date);

          return (
            saleDate.getMonth() === index &&
            saleDate.getFullYear() === now.getFullYear()
          );
        })
        .reduce((sum, sale) => sum + Number(sale.amount), 0);

      return {
        label,
        total,
      };
    });
  }, [range, sales]);

  return (
    <div className="space-y-4">
      {/* TOGGLE */}
      <div className="overflow-x-auto">
        <ToggleGroup
          type="single"
          value={range}
          onValueChange={(value) => {
            if (value) setRange(value);
          }}
          className="w-full justify-start"
        >
          <ToggleGroupItem value="7d">Last 7 Days</ToggleGroupItem>

          <ToggleGroupItem value="3m">Last 3 Months</ToggleGroupItem>

          <ToggleGroupItem value="1y">This Year</ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* CHART */}
      <div className="w-full min-w-0">
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart data={chartData}>
            {/* GRADIENT */}
            <defs>
              <linearGradient id="salesWave" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity={0.35} />

                <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
              </linearGradient>
            </defs>

            {/* GRID */}
            <CartesianGrid
              strokeDasharray="3 3"
              opacity={0.08}
              vertical={false}
            />

            {/* X */}
            <XAxis
              dataKey="label"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />

            {/* Y */}
            <YAxis
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₱${Number(value).toLocaleString()}`}
            />

            {/* TOOLTIP */}
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

            {/* AREA */}
            <Area
              // type="natural"
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
