import prismadb from "@/lib/prismadb";

export const getTotalLayananAir = async (storeId: string) => {
    const waterUsages = await prismadb.dailyReport.findMany({
        where: {
            storeId,
        },
    });

    // Hitung total pemakaian air
    const totalLayananAir = waterUsages.reduce((total, usage) => {
        return total + Number(usage.layanan); // Pastikan `layanan` dikonversi ke number
    }, 0);

    // Format angka dengan koma (contoh: 20000 menjadi 20,000)
    const formattedPemakaianAir = totalLayananAir.toLocaleString();

    return formattedPemakaianAir;
};
