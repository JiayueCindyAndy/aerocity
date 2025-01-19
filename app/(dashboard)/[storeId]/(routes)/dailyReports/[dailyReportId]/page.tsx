import prismadb from "@/lib/prismadb";
import { DailyReportForm } from "./components/dailyReport-form";

const DailyReportsPage = async ({
    params
}: {
    params: { dailyReportId: string }
}) => {
    const dailyReport = await prismadb.dailyReport.findUnique({
        where: {
            id: params.dailyReportId
        }
    });

    return (
        <div className="flex-col">
           <div className="flex-1 space-y-4 p-8 pt-6">
               <DailyReportForm initialData={dailyReport} /> 
           </div>
        </div>
    )
}

export default DailyReportsPage;