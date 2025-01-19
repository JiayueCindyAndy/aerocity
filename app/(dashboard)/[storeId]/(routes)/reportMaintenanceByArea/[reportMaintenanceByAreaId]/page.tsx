import prismadb from "@/lib/prismadb";
import { ReportMaintenanceByAreaForm } from "./components/reportMaintenanceByArea-form";

const ReportMaintenanceByAreaPage = async ({
    params
}: {
    params: { reportMaintenanceByAreaId: string }
}) => {
    const reportMaintenanceByArea = await prismadb.reportMaintenanceByArea.findUnique({
        where: {
            id: params.reportMaintenanceByAreaId
        }
    });

    return (
        <div className="flex-col">
           <div className="flex-1 space-y-4 p-8 pt-6">
               <ReportMaintenanceByAreaForm initialData={reportMaintenanceByArea} /> 
           </div>
        </div>
    )
}

export default ReportMaintenanceByAreaPage;