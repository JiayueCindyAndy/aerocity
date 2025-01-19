"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import React from "react";
import { PelangganColumn, columns } from "./collumn";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface PelangganClientProps {
    data: PelangganColumn[]
}

export const PelangganClient: React.FC<PelangganClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading 
                 title={`Pelanggan`}
                 description="Manage Pelanggan"
                />
                <Button onClick={() => router.push(`/${params.storeId}/pelanggan/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable  searchKey="name" columns={columns} data={data} />
            <Heading title="API" description="API calls for Pelanggan" /> 
            <Separator />
            <ApiList entityName="pelanggan" entityIdName="pelangganId"/>
        </>
    )
}