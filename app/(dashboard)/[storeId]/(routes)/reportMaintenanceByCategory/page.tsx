import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { ReportMaintenanceByCategorysClient } from "./components/client";
import { ReportMaintenanceByCategoryCollumn } from "./components/columns";

const ReportMaintenanceByCategorysPage = async ({
    params
}: {
    params: { storeId: string }
}) => {
    const reportMaintenanceByCategory = await prismadb.reportMaintenanceByCategory.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const formattedReportMaintenanceByCategorys: ReportMaintenanceByCategoryCollumn[] = reportMaintenanceByCategory.map((item) => ({
        id: item.id,
        validasi: item.validasi.toString(),
        pembersihan: item.pembersihan.toString(),
        penggunaan: item.penggunaan.toString(),
        perencanaan: item.perencanaan.toString(),
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ReportMaintenanceByCategorysClient data={formattedReportMaintenanceByCategorys} />
            </div>
        </div>
    )
}

export default ReportMaintenanceByCategorysPage;