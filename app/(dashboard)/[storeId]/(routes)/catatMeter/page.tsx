import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { CatatMeterClient } from "./components/client";
import { CatatMeterCollumn } from "./components/collumn";

const CatatMetersPage = async ({
    params
}: {
    params: { storeId: string }
}) => {
    const catatMeters = await prismadb.catatMeter.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const formattedCatatMeters: CatatMeterCollumn[] = catatMeters.map((item) => ({
        id: item.id,
        name: item.name,
        type: item.type,
        key: item.key,
        label: item.label,
        formula: item.formula,
        show: item.show,
        editable: item.editable,
        require: item.require,
        initialValue: item.initialValue,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <CatatMeterClient data={formattedCatatMeters} />
            </div>
        </div>
    )
}

export default CatatMetersPage;