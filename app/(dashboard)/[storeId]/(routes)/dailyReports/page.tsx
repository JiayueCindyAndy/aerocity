import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { DailyReportClient } from "./components/client";
import { DailyReportCollumn } from "./components/columns";
import { formatter, formatToIDR } from "@/lib/utils";
import { formatterMetter } from "@/lib/utilsMeter";
import { formatterCentimeter } from "@/lib/utilsCentiMeter";

const DailyReportsPage = async ({
    params
}: {
    params: { storeId: string }
}) => {
    const dailyReports = await prismadb.dailyReport.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const formatteddailyReports: DailyReportCollumn[] = dailyReports.map((item) => ({
        id: item.id,
        idCater: item.idCater,
        nama: item.nama,
        standAkhir: item.standAkhir.toString(),
        pemakaian: item.pemakaian.toString(),
        layanan: item.layanan.toString(),
        // pemakaian: formatToIDR(item.pemakaian.toNumber()),
        ketinggianAir: formatterCentimeter.format(item.ketinggianAir.toNumber()),
        pembayaranAir: formatToIDR(item.pembayaranAir.toNumber()),
        imageUrl: item.imageUrl,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }));

    return (
        <div className="flex-col mt-4 mr-4 mb-4 bg-white dark:bg-customDark ">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <DailyReportClient data={formatteddailyReports} />
            </div>
        </div>
    )
}

export default DailyReportsPage;