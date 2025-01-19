"use client"

import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ReportMaintenanceByCategoryProps {
  data: any[];
}

export const ReportMaintenanceByCategory: React.FC<ReportMaintenanceByCategoryProps> = ({
  data,

}) => {
  return (
    <Card className="rounded-none border-none flex flex-col text-muted-foreground">
      <CardHeader className="items-center pt-0">
      <CardTitle className="text-md text-center">REPORT MAINTENANCE BY CATEGORY</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 ">
        <ResponsiveContainer
          className="mx-auto aspect-square max-h-[160px]"
        >
          <PieChart>
          <Tooltip
        formatter={(value: any, name: any) => [`${value}`, `${name}`]} // Format tooltip
        contentStyle={{
          backgroundColor: "#FFFFFF", // Ganti dengan warna pilihan (contoh: emas)
          color: "#FFFF", // Warna teks di tooltip
          borderRadius: "5px",
          border: "1px solid #FFFF", // Tambahkan border jika diperlukan
        }}
        itemStyle={{
          color: "#6b7280", // Warna teks item (opsional)
          fontSize: "small"
        }}/>
            <Pie
              data={data}
              dataKey="total"
              nameKey="name"
              innerRadius={50}
              outerRadius={75}
             />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
