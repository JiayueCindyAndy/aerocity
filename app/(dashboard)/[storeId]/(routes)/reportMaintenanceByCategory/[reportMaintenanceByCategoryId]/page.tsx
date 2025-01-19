import prismadb from "@/lib/prismadb";
import { ReportMaintenanceByCategoryForm } from "./components/reportMaintenanceByCategory-form";

const ReportMaintenanceByCategoryPage = async ({
    params
}: {
    params: { reportMaintenanceByCategoryId: string }
}) => {
    const reportMaintenanceByCategory = await prismadb.reportMaintenanceByCategory.findUnique({
        where: {
            id: params.reportMaintenanceByCategoryId
        }
    });

    return (
        <div className="flex-col">
           <div className="flex-1 space-y-4 p-8 pt-6">
               <ReportMaintenanceByCategoryForm initialData={reportMaintenanceByCategory} /> 
           </div>
        </div>
    )
}

export default ReportMaintenanceByCategoryPage;