import prismadb from "@/lib/prismadb";
import { CatatMeterForm } from "./components/catatMeter-form";

const CatatMeterPage = async ({
    params
}: {
    params: { catatMeterId: string }
}) => {
    const catatMeter = await prismadb.catatMeter.findUnique({
        where: {
            id: params.catatMeterId
        }
    });

    return (
        <div className="flex-col">
           <div className="flex-1 space-y-4 p-8 pt-6">
               <CatatMeterForm initialData={catatMeter} /> 
           </div>
        </div>
    )
}

export default CatatMeterPage;