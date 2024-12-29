"use client";

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const data = [
  { date: "2023-01-01", positive: 65, neutral: 25, negative: 10 },
  { date: "2023-01-02", positive: 68, neutral: 22, negative: 10 },
  { date: "2023-01-03", positive: 75, neutral: 20, negative: 5 },
  { date: "2023-01-04", positive: 70, neutral: 25, negative: 5 },
  { date: "2023-01-05", positive: 72, neutral: 23, negative: 5 },
  { date: "2023-01-06", positive: 78, neutral: 20, negative: 2 },
  { date: "2023-01-07", positive: 80, neutral: 18, negative: 2 },
];

export function SentimentChart() {
  return (
    <ChartContainer
      config={{
        positive: {
          label: "Positive",
          color: "hsl(var(--chart-1))",
        },
        neutral: {
          label: "Neutral",
          color: "hsl(var(--chart-2))",
        },
        negative: {
          label: "Negative",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-[300px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="positive"
            stroke="var(--color-positive)"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="neutral"
            stroke="var(--color-neutral)"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="negative"
            stroke="var(--color-negative)"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
