"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import React from "react";
import { DailyReportCollumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface DailyReportClientProps {
    data: DailyReportCollumn[]
}

export const DailyReportClient: React.FC<DailyReportClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();

    return (
        <>
            <div className="flex items-center justify-between bg-white dark:bg-customDark ">
                <Heading 
                 title={`Manage All Reports (${data.length})`}
                 description="Manage all your reports"
                />
                <Button onClick={() => router.push(`/${params.storeId}/dailyReports/new`)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="nama" columns={columns} data={data} />
            <Heading title="API" description="API calls for Daily Report" /> 
            <Separator />
            <ApiList entityName="dailyReport" entityIdName="dailyReportId"/>
        </>
    )
}