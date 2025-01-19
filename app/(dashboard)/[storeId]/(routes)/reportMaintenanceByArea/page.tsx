import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { ReportMaintenanceByAreasClient } from "./components/client";
import { ReportMaintenanceByAreaCollumn } from "./components/columns";

const ReportMaintenanceByAreasPage = async ({
    params
}: {
    params: { storeId: string }
}) => {
    const reportMaintenanceByArea = await prismadb.reportMaintenanceByArea.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const formattedReportMaintenanceByAreas: ReportMaintenanceByAreaCollumn[] = reportMaintenanceByArea.map((item) => ({
        id: item.id,
        bmkg: item.bmkg.toString(),
        airNav: item.airNav.toString(),
        pla: item.pla.toString(),
        ptBib: item.ptBib.toString(),
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ReportMaintenanceByAreasClient data={formattedReportMaintenanceByAreas} />
            </div>
        </div>
    )
}

export default ReportMaintenanceByAreasPage;