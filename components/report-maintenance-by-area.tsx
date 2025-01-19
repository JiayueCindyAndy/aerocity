"use client";

import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prismadb from "@/lib/prismadb";
import { ChartTooltip, ChartTooltipContent } from "./ui/chart";

interface ReportMaintenanceByAreaProps {
  data: any[];
}

export const ReportMaintenanceByArea: React.FC<ReportMaintenanceByAreaProps> = ({
  data,
}) => {
  return (
    <Card className="rounded-none border-none">
      <CardHeader>
        <CardTitle className="text-md text-center">REPORT MAINTENANCE BY AREA</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
      <ResponsiveContainer width="100%" height={140}>
            <BarChart margin={{ top: 25, right: 0, left: 0, bottom: 0 }} data={data}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <Bar barSize={40} dataKey="total" fill="#C4C4C4" radius={[4, 4, 0, 0]}>
                <LabelList
                  position="top"
                  offset={7}
                  className="fill-foreground"
                  fontSize={11}
                />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};