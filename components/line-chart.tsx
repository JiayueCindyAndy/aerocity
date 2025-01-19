"use client";

import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DotProps } from "recharts"

interface OverviewProps {
  data: any[];
}

export const LineChart1: React.FC<OverviewProps> = ({ data }) => {
  return (
    <Card className="bg-blue-200 dark:bg-custom-dark-bg ">
    <CardHeader>
      <CardTitle className="text-center text-md">Daily Report (All)</CardTitle>
     
    </CardHeader>
    <CardContent className="">
    <ResponsiveContainer width="106%" height={190} style={{ marginLeft: '-20px'}}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: -33, bottom: 0 }}>
        <CartesianGrid strokeDasharray="" stroke="var(--color-strokeDashArray)"  />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={10}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={10}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip />
        <Line
  type="monotone"
  dataKey="total"
  stroke="#3498db"
  strokeWidth={2}
  dot={(props: { cx?: number; cy?: number; payload?: { total?: number | null } }) => {
    const { cx, cy, payload } = props;

    // Validasi keberadaan `payload`, `total`, dan pastikan `total` bukan 0
    if (!payload || payload.total === null || payload.total === undefined || payload.total === 0) {
      return <></>; // Tidak render dot jika tidak valid atau total == 0
    }

    // Render dot
    return <circle cx={cx} cy={cy} r={4} fill="#FFFF" />;
  }}
  activeDot={(props: { cx?: number; cy?: number; payload?: { total?: number | null } }) => {
    const { cx, cy, payload } = props;

    // Validasi keberadaan `payload`, `total`, dan pastikan `total` bukan 0
    if (!payload || payload.total === null || payload.total === undefined || payload.total === 0) {
      return <></>; // Tidak render activeDot jika tidak valid atau total == 0
    }

    // Render activeDot
    return <circle cx={cx} cy={cy} r={6} fill="#3498db" stroke="#fff" strokeWidth={2} />;
  }}
/>






      </LineChart>
    </ResponsiveContainer>
    </CardContent>

    </Card>
  );
};
