import prismadb from "@/lib/prismadb";

export const getTotalPelanggan = async (storeId: string) => {
    const dailyReports = await prismadb.dailyReport.findMany({
        where: {
            storeId,
        },
        select: {
            idCater: true, // Hanya ambil idCater untuk efisiensi
        },
    });

    // Hitung jumlah idCater yang unik
    const uniqueIdCater = new Set(dailyReports.map((report) => report.idCater));
    return uniqueIdCater.size; // Mengembalikan jumlah data unik
};
