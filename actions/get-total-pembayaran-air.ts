import prismadb from "@/lib/prismadb";

export const getTotalPembayaranAir = async (storeId: string) => {
    const waterUsages = await prismadb.dailyReport.findMany({
        where: {
            storeId,
        },
    });

    // Hitung total pemakaian air
    const totalPembayaranAir = waterUsages.reduce((total, usage) => {
        return total + Number(usage.pembayaranAir); // Pastikan `pembayaranAir` dikonversi ke number
    }, 0);

    // Format angka dengan koma (contoh: 20000 menjadi 20,000)
    const formattedPemakaianAir = totalPembayaranAir.toLocaleString();

    return formattedPemakaianAir;
};
