"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ReportMaintenanceByCategoryCollumn = {
  id: string
  inspeksi: string
  kalibrasi: string
  pembersihan: string
  penggantian: string
  createdAt: string
}

export const columns: ColumnDef<ReportMaintenanceByCategoryCollumn>[] = [
  {
    accessorKey: "inspeksi",
    header: "Inspeksi",
  },
  {
    accessorKey: "kalibrasi",
    header: "Kalibrasi",
  },
  {
    accessorKey: "pembersihan",
    header: "Pembersihan",
  },
  {
    accessorKey: "penggantian",
    header: "Penggantian",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original}/>
  }
]
