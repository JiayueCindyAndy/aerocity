import prismadb from "@/lib/prismadb";

export const getReportMaintenanceByCategoryData = async (storeId: string) => {
  const maintenanceData = await prismadb.reportMaintenanceByCategory.findMany({
    where: {
      storeId,
    },
  });

  const totals = {
    Validasi: 0,
    Pembersihan: 0,
    Penggunaan: 0,
    Perencanaan: 0,
  };

  for (const record of maintenanceData) {
    totals.Validasi += Number(record.validasi);
    totals.Pembersihan += Number(record.pembersihan);
    totals.Penggunaan += Number(record.penggunaan);
    totals.Perencanaan += Number(record.perencanaan);
  }

  // Tambahkan warna untuk masing-masing kategori
  return [
    { name: "Validasi", total: totals.Validasi, fill: "#04CD97" },
    { name: "Pembersihan", total: totals.Pembersihan, fill: "#FCB603" },
    { name: "Penggunaan", total: totals.Penggunaan, fill: "#33CCCC" },
    { name: "Perencanaan", total: totals.Perencanaan, fill: "#A3A3A3" },
  ];
};
