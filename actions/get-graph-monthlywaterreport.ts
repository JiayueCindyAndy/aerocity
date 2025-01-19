import prismadb from "@/lib/prismadb";

interface GraphData {
  name: string; // Nama bulan, misalnya "Jan", "Feb"
  total: number; // Total pemakaian
}

export const getGraphMonthlyReport = async (storeId: string) => {
  const waterUsages = await prismadb.dailyReport.findMany({
    where: {
      storeId,
    },
  });

  // Objek untuk menyimpan total pemakaian berdasarkan bulan
  const monthlyRevenue: { [key: string]: number } = {};

  for (const water of waterUsages) {
    // Ambil bulan dari `createdAt`
    const month = water.createdAt.getMonth(); // Menghasilkan bulan (0-11)
    const revenueForWater = Number(water.pemakaian); // Konversi `Decimal` ke number

    // Tambahkan ke bulan yang sesuai
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueForWater;
  }

  // Nama-nama bulan
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Siapkan data grafik default untuk 12 bulan
  const graphData: GraphData[] = monthNames.map((month, index) => ({
    name: month,
    total: monthlyRevenue[index] || 0,
  }));

  return graphData;
};
