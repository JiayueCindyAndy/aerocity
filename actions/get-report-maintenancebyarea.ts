import prismadb from "@/lib/prismadb";

export const getReportMaintenanceByAreaData = async (storeId: string) => {
    const maintenanceData = await prismadb.reportMaintenanceByArea.findMany({
      where: {
        storeId,
      },
    });
  
    const totals = {
      BMKG: 0,
      AirNav: 0,
      PLA: 0,
      PTBib: 0,
    };
  
    for (const record of maintenanceData) {
      totals.BMKG += Number(record.bmkg);
      totals.AirNav += Number(record.airNav);
      totals.PLA += Number(record.pla);
      totals.PTBib += Number(record.ptBib);
    }
  
    return [
      { name: "BMKG", total: totals.BMKG },
      { name: "Air Nav", total: totals.AirNav },
      { name: "PLA", total: totals.PLA },
      { name: "PT Bib", total: totals.PTBib },
    ];
  };