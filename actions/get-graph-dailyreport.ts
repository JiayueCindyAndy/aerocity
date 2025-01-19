import prismadb from "@/lib/prismadb";

interface GraphData {
  name: string;
  total: number | null; // Gunakan null untuk nilai di masa depan
}

export const getGraphDailyReport = async (storeId: string) => {
  const waterUsages = await prismadb.dailyReport.findMany({
    where: {
      storeId,
    },
  });

  // Buat objek untuk menyimpan total pemakaian berdasarkan hari
  const dailyRevenue: { [key: string]: number } = {};

  for (const water of waterUsages) {
    // Ambil hari dari `createdAt`
    const day = water.createdAt.getDate(); // Menghasilkan tanggal (1-31)
    const revenueForWater = Number(water.ketinggianAir); // Konversi `Decimal` ke number

    // Tambahkan ke hari yang sesuai
    dailyRevenue[day] = (dailyRevenue[day] || 0) + revenueForWater;
  }

  // Tentukan tanggal saat ini
  const today = new Date().getDate();

  // Siapkan data grafik untuk semua tanggal (1-31)
  const graphData: GraphData[] = Array.from({ length: 31 }, (_, i) => {
    const day = i + 1; // Tanggal sebenarnya (1-31)
    return {
      name: day.toString().padStart(2, "0"), // Format "01", "02", ...
      total: day <= today ? dailyRevenue[day] || 0 : null, // Gunakan null untuk tanggal di masa depan
    };
  });

  return graphData;
};
