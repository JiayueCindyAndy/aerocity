import prismadb from "@/lib/prismadb";

export const getReportMaintenanceByCategoryData = async (storeId: string) => {
  const maintenanceData = await prismadb.reportMaintenanceByCategory.findMany({
    where: {
      storeId,
    },
  });

  const totals = {
    Inspeksi: 0,
    Kalibrasi: 0,
    Pembersihan: 0,
    Penggantian: 0,
  };

  for (const record of maintenanceData) {
    totals.Inspeksi += Number(record.inspeksi);
    totals.Kalibrasi += Number(record.kalibrasi);
    totals.Pembersihan += Number(record.pembersihan);
    totals.Penggantian += Number(record.penggantian);
  }

  // Tambahkan warna untuk masing-masing kategori
  return [
    { name: "Inspeksi", total: totals.Inspeksi, fill: "#04CD97" },
    { name: "Penggantian", total: totals.Penggantian, fill: "#FCB603" },
    { name: "Pembersihan", total: totals.Pembersihan, fill: "#33CCCC" },
    { name: "Kalibrasi", total: totals.Kalibrasi, fill: "#A3A3A3" },
  ];
};
