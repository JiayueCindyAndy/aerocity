"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import React from "react";
import { ReportMaintenanceByAreaCollumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface ReportMaintenanceByAreasClientProps {
    data: ReportMaintenanceByAreaCollumn[]
}

export const ReportMaintenanceByAreasClient: React.FC<ReportMaintenanceByAreasClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading 
                 title={`Report Maintenance By Area (${data.length})`}
                 description=""
                />
                <Button onClick={() => router.push(`/${params.storeId}/reportMaintenanceByArea/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="createdAt" columns={columns} data={data} />
            <Heading title="API" description="API calls for Length" /> 
            <Separator />
            <ApiList entityName="length" entityIdName="lengthId"/>
        </>
    )
}