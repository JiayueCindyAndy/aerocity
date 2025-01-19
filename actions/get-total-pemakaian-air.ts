import prismadb from "@/lib/prismadb";

export const getTotalPemakaianAir = async (storeId: string) => {
    const waterUsages = await prismadb.dailyReport.findMany({
        where: {
            storeId,
        },
    });

    // Hitung total pemakaian air
    const totalPemakaianAir = waterUsages.reduce((total, usage) => {
        return total + Number(usage.pemakaian); // Pastikan `pemakaian` dikonversi ke number
    }, 0);

    // Format angka dengan koma (contoh: 20000 menjadi 20,000)
    const formattedPemakaianAir = totalPemakaianAir.toLocaleString();

    return formattedPemakaianAir;
};
