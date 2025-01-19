"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CatatMeterCollumn = {
  id: string
  name: string
  type: string
  key: boolean
  label: boolean
  formula: string
  show: boolean
  editable: boolean
  require: boolean
  initialValue: string
  createdAt: string
}

export const columns: ColumnDef<CatatMeterCollumn>[] = [
  {
    accessorKey: "name",
    header: "NAME",
  },
  {
    accessorKey: "type",
    header: "TYPE",
  },
  {
    accessorKey: "key",
    header: "KEY",
  },
  {
    accessorKey: "label",
    header: "LABEL",
  },
  {
    accessorKey: "formula",
    header: "FORMULA",
  },
  {
    accessorKey: "show",
    header: "SHOW",
  },
  {
    accessorKey: "editable",
    header: "EDITABLE",
  },
  {
    accessorKey: "require",
    header: "REQUIRE",
  },
  {
    accessorKey: "initialValue",
    header: "INITIAL VALUE",
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
