"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import React from "react";
import { CatatMeterCollumn, columns } from "./collumn";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface CatatMeterClientProps {
    data: CatatMeterCollumn[]
}

export const CatatMeterClient: React.FC<CatatMeterClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading 
                 title={`Catat Meter (${data.length})`}
                 description=" "
                />
                <Button onClick={() => router.push(`/${params.storeId}/catatMeter/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable  searchKey="name" columns={columns} data={data} />
            <Heading title="API" description="API calls for Catat Meter" /> 
            <Separator />
            <ApiList entityName="catatMeter" entityIdName="catatMeterId"/>
        </>
    )
}