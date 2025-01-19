"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ReportMaintenanceByAreaCollumn = {
  id: string
  bmkg: string
  airNav: string
  pla: string
  ptBib: string
  createdAt: string
}

export const columns: ColumnDef<ReportMaintenanceByAreaCollumn>[] = [
  {
    accessorKey: "bmkg",
    header: "BMKG",
  },
  {
    accessorKey: "airNav",
    header: "Air Nav",
  },
  {
    accessorKey: "pla",
    header: "PLA",
  },
  {
    accessorKey: "ptBib",
    header: "PT BIB",
  },
  {
    accessorKey: "createdAt",
    header: "DATE",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original}/>
  }
]
