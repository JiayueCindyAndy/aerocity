import { getGraphRevenue } from "@/actions/get-graph-revenue";
import { getSalesCount } from "@/actions/get-sales-count";
import { getStockCount } from "@/actions/get-stock-count";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { getGraphDailyReport } from "@/actions/get-graph-dailyreport";
import { getGraphMonthlyReport } from "@/actions/get-graph-monthlywaterreport";
import { getTotalPemakaianAir } from "@/actions/get-total-pemakaian-air";
import { getTotalPelanggan } from "@/actions/get-total-pelanggan";
import { getTotalLayananAir } from "@/actions/get-total-layanan";
import { getReportMaintenanceByAreaData } from "@/actions/get-report-maintenancebyarea";
import { LineChart1 } from "@/components/line-chart";
import { getTotalPembayaranAir } from "@/actions/get-total-pembayaran-air";
import MapComponent from "@/components/map";
import Map from "@/components/mapFinal";
import { Overview } from "@/components/overview";
import { ReportMaintenanceByCategory } from "@/components/report-maintenance";
import { ReportMaintenanceByArea } from "@/components/report-maintenance-by-area";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";
import { CreditCard, DollarSign, Package, Users, PieChart, BarChart, Navigation  } from "lucide-react";
import Image from "next/image";
import { OverviewMonthlyReport } from "@/components/overview-monthly-report";
import { getReportMaintenanceByCategoryData } from "@/actions/get-report-maintenancebycategory";

interface DashboardPageProps {
    params: { storeId: string }
};

const DashboardPage: React.FC<DashboardPageProps> = async ({
    params
}) => {
    const totalRevenue = await getTotalRevenue(params.storeId);
    const totalPemakaianAir = await getTotalPemakaianAir(params.storeId);
    const totalLayananAir = await getTotalLayananAir(params.storeId);
    const totalPelanggan = await getTotalPelanggan(params.storeId);
    const totalPembayaranAir = await getTotalPembayaranAir(params.storeId);
    const salesCount = await getSalesCount(params.storeId);
    const stockCount = await getStockCount(params.storeId);
    const graphRevenue = await getGraphRevenue(params.storeId);
    const graphDailyReport = await getGraphDailyReport(params.storeId);
    const graphMonthlyReport = await getGraphMonthlyReport(params.storeId);
    const reportMaintenanceByArea = await getReportMaintenanceByAreaData(params.storeId);
    const reportMaintenanceByCategory = await getReportMaintenanceByCategoryData(params.storeId);

    return (
        <div className="flex flex-col dark:bg-customDark bg-customBlue ">
            <div className="flex-1 space-y-3 p-2 pt-4">
                {/* <Heading title="Dashboard Performance" description="Distribusi Air" />
                <Separator /> */}
                {/* <div className="grid gap-4 grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Revenue
                            </CardTitle>
                            <Users className="h-10 w-10 text-custom-teal" />
                        </CardHeader>
                        <CardContent>
                           <div className="text-2xl font-bold">
                                {formatter.format(totalRevenue)}
                            </div> 
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Sales
                            </CardTitle>
                            <PieChart className="h-10 w-10 text-custom-teal text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                           <div className="text-2xl font-bold">
                                +{salesCount}
                            </div> 
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Product In Stock
                            </CardTitle>
                            <BarChart className="h-10 w-10 text-custom-teal text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                           <div className="text-2xl font-bold">
                                {stockCount}
                            </div> 
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Product In Stock
                            </CardTitle>
                            <Navigation className="h-10 w-10 text-custom-teal text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                           <div className="text-2xl font-bold">
                                {stockCount}
                            </div> 
                        </CardContent>
                    </Card>
                </div> */}
                <Card  className="flex relative pt-5 pb-5 pl-5 bg-gradient-to-r from-[#ccf484] via-[#64d4b4] to-[#6c9cec]">
                   
                        <div className="">
                            <CardTitle className="font-bold">Dashboard Performance</CardTitle>
                            <CardDescription>Distribusi Air</CardDescription>
                        </div>
                        <div className="mr-4 absolute right-0 top-2 hidden lg:block">
                        <Image 
                            src="/bp.jpeg"  // Ganti dengan path gambar yang sesuai
                            alt="Descriptive Alt Text"     // Ganti dengan alt text untuk aksesibilitas
                            width={67}                    // Tentukan lebar gambar
                            height={67}                   // Tentukan tinggi gambar
                            className="object-cover"       // Agar gambar tetap proporsional
                            />
                         </div>
                    
                </Card>
                <div className="grid gap-4 grid-cols-3">
                    
                </div>
                <div className="grid gap-4 grid-cols-3">
                <Card className="col-span-2">
                    <CardHeader >
                        <CardTitle className="text-md pl-1 bg-customBlue dark:bg-customDark dark:text-white text-violet-700 w-2/6 rounded-lg">Laporan Ketinggian Air</CardTitle>
                    </CardHeader>
                    <CardContent className="mt-7">
                            <LineChart1 data={graphDailyReport} />
                            
                        </CardContent>
                </Card>
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle className="text-md dark:text-white text-blue-600">Jaringan Air (Meteran)</CardTitle>
                    </CardHeader>
                    <CardContent className="">
                        
                        <Map />
                    </CardContent>
                </Card>
                </div>
                <div className="grid">
                    <div className="grid gap-4 grid-cols-3">
                        <Card className="">  
                        <CardContent className="pl-0 pr-0 pb-0 flex flex-col gap-1 bg-blue-500 dark:bg-white">
                            <ReportMaintenanceByCategory data={reportMaintenanceByCategory} />
                           {/* <ReportMaintenance /> */}
                           <ReportMaintenanceByArea data={reportMaintenanceByArea} />
                           {/* <ReportMaintenanceByArea /> */}
                        </CardContent>
                        </Card>
                        <Card className="">
                        <CardHeader>
                        <CardTitle className="text-lg dark:text-white text-violet-700">Laporan Pemakaian Air</CardTitle>
                        </CardHeader>
                        
                        <CardContent className="pl-2 ">
                            <OverviewMonthlyReport data={graphMonthlyReport} />
                        </CardContent>
                        </Card>
                        <Card className="">
                        <CardHeader>
                            
                        </CardHeader>
                        <CardContent className="grid gap-5 grid-cols-2">
                            {/* <Overview data={graphRevenue} /> */}
                            <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Pelanggan
                            </CardTitle>
                            <Users className="h-10 w-10 " />
                        </CardHeader>
                        <CardContent>
                           <div className="text-2xl font-bold">
                                {formatter.format(totalPelanggan)}
                            </div> 
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Layanan
                            </CardTitle>
                            <PieChart className="h-10 w-10 text-custom-teal text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                           <div className="text-2xl font-bold">
                                +{totalLayananAir}
                            </div> 
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total water usage
                            </CardTitle>
                            <BarChart className="h-10 w-10 text-custom-teal text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                           <div className="text-2xl font-bold">
                                {totalPemakaianAir}
                            </div> 
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                            Total water payment
                            </CardTitle>
                            <Navigation className="h-10 w-10 text-custom-teal text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                           <div className="text-2xl font-bold">
                                {totalPembayaranAir}
                            </div> 
                        </CardContent>
                    </Card>
                        </CardContent>
                        </Card>
                    </div>
                   
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
