"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type DailyReportCollumn = {
  id: string
  idCater: string
  nama: string
  standAkhir: string
  pemakaian: string
  ketinggianAir: string
  layanan: string
  pembayaranAir: string
  imageUrl: string
  createdAt: string
}

export const columns: ColumnDef<DailyReportCollumn>[] = [
  {
    accessorKey: "id",
    header: "Id User",
  },
  {
    accessorKey: "idCater",
    header: "Id Cater",
  },
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "standAkhir",
    header: "Stand Akhir",
  },
  {
    accessorKey: "pemakaian",
    header: "Pemakaian",
  },
  {
    accessorKey: "ketinggianAir",
    header: "Ketinggian Air",
  },
  {
    accessorKey: "pembayaranAir",
    header: "Pembayaran Air",
  },
  {
    accessorKey: "layanan",
    header: "Layanan",
  },
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => (
      <div className="flex justify-center">
        <img
          src={row.original.imageUrl}
          alt="Report Image"
          className="object-cover rounded-md"
        />
      </div>
    ),
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
