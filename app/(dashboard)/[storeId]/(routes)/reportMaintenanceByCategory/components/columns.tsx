"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ReportMaintenanceByCategoryCollumn = {
  id: string
  validasi: string
  pembersihan: string
  penggunaan: string
  perencanaan: string
  createdAt: string
}

export const columns: ColumnDef<ReportMaintenanceByCategoryCollumn>[] = [
  {
    accessorKey: "validasi",
    header: "Validasi",
  },
  {
    accessorKey: "pembersihan",
    header: "Pembersihan",
  },
  {
    accessorKey: "penggunaan",
    header: "Penggunaan",
  },
  {
    accessorKey: "perencanaan",
    header: "Perencanaan",
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
