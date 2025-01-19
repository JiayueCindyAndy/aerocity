import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET (
    req: Request,
    { params }: { params: { dailyReportId: string } }
) {
    try {
        if (!params.dailyReportId) { 
            return new NextResponse("Daily Report id is required", { status: 400 });
        }

        const dailyReport = await prismadb.dailyReport.findUnique({
            where: {
                id: params.dailyReportId,
            }
        });

        return NextResponse.json(dailyReport);

    } catch (error) {
        console.log('[DAILYREPORT_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function PATCH (
    req: Request,
    { params }: { params: { storeId: string,  dailyReportId: string } }
) {
    try {
        const { userId } = auth();
        const body = await req.json();

        const { idCater, nama, standAkhir, pemakaian, ketinggianAir, layanan, pembayaranAir, imageUrl } = body; 

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!idCater) {
            return new NextResponse("Id Cater is required", { status: 400});
        }

        if (!nama) {
            return new NextResponse("Nama is required", { status: 400});
        }

        if (!standAkhir) {
            return new NextResponse("Stand AKhir is required", { status: 400});
        }

        if (!pemakaian) {
            return new NextResponse("pemakaian is required", { status: 400});
        }

        if (!ketinggianAir) {
            return new NextResponse("ketinggian Air is required", { status: 400});
        }

        if (!layanan) {
            return new NextResponse("Layanan is required", { status: 400});
        }

        if (!pembayaranAir) {
            return new NextResponse("pembayaran Air is required", { status: 400});
        }

        if (!imageUrl) {
            return new NextResponse("Image URL is required", { status: 400});
        }

        if (!params.dailyReportId) { 
            return new NextResponse("Daily Report id is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const dailyReport = await prismadb.dailyReport.updateMany({
            where: {
                id: params.dailyReportId,
            },
            data: {
                idCater,
                nama,
                standAkhir,
                pemakaian,
                ketinggianAir,
                layanan,
                pembayaranAir,
                imageUrl
            }
        });

        return NextResponse.json(dailyReport);

    } catch (error) {
        console.log('[DAILYREPORT_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function DELETE (
    req: Request,
    { params }: { params: { storeId: string, dailyReportId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!params.dailyReportId) { 
            return new NextResponse("Daily Report id is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const dailyReport = await prismadb.dailyReport.deleteMany({
            where: {
                id: params.dailyReportId,
            }
        });

        return NextResponse.json(dailyReport);

    } catch (error) {
        console.log('[DAILYREPORT_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

