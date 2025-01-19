import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = auth();
        const body =  await req.json();

        const { idCater, nama, pemakaian, standAkhir, ketinggianAir, layanan, pembayaranAir, imageUrl } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!idCater) {
            return new NextResponse("Id Cater is required", { status: 400 });
        }

        if (!nama) {
            return new NextResponse("Nama is required", { status: 400 });
        }

        if (!standAkhir) {
            return new NextResponse("Stand Akhir is required", { status: 400 });
        }

        if (!pemakaian) {
            return new NextResponse("Pemakaian is required", { status: 400 });
        }

        if (!ketinggianAir) {
            return new NextResponse("ketinggian Air is required", { status: 400 });
        }

        if (!layanan) {
            return new NextResponse("Layanan is required", { status: 400});
        }

        if (!pembayaranAir) {
            return new NextResponse("pembayaran Air is required", { status: 400});
        }

        if (!imageUrl) {
            return new NextResponse("Image URL is required", { status: 400 });
        }

        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
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

        const dailyReport = await prismadb.dailyReport.create({
            data: {
                idCater,
                nama,
                pemakaian,
                standAkhir,
                imageUrl,
                ketinggianAir,
                layanan,
                pembayaranAir,
                storeId: params.storeId
            }
        });

        return NextResponse.json(dailyReport);

    } catch (error) {
        console.log('[DAILYREPORT_POST]', error);
        return new NextResponse("Internal error", { status: 500 });      
    }
}

export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const dailyReports = await prismadb.dailyReport.findMany({
           where: {
            storeId: params.storeId,
           },
        });

        return NextResponse.json(dailyReports);

    } catch (error) {
        console.log('[DAILYREPORTS_GET]', error);
        return new NextResponse("Internal error", { status: 500 });      
    }
}