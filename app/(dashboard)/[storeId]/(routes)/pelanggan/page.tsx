import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { PelangganClient } from "./components/client";
import { PelangganColumn } from "./components/collumn";

const PelanggansPage = async ({
    params
}: {
    params: { storeId: string }
}) => {
    const pelanggans = await prismadb.pelanggan.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    const formattedPelanggans: PelangganColumn[] = pelanggans.map((item) => ({
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
                <PelangganClient data={formattedPelanggans} />
            </div>
        </div>
    )
}

export default PelanggansPage;