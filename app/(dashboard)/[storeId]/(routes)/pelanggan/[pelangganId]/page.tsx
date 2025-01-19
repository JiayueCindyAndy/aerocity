import prismadb from "@/lib/prismadb";
import { PelangganForm } from "./components/pelanggan-form";

const PelangganPage = async ({
    params
}: {
    params: { pelangganId: string }
}) => {
    const pelanggan = await prismadb.pelanggan.findUnique({
        where: {
            id: params.pelangganId
        }
    });

    return (
        <div className="flex-col">
           <div className="flex-1 space-y-4 p-8 pt-6">
               <PelangganForm initialData={pelanggan} /> 
           </div>
        </div>
    )
}

export default PelangganPage;