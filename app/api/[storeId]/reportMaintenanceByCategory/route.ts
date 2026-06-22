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

        const { inspeksi, kalibrasi, pembersihan, penggantian } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!inspeksi) {
            return new NextResponse("Inspeksi is required", { status: 400});
        }

        if (!kalibrasi) {
            return new NextResponse("Kalibrasi is required", { status: 400});
        }

        if (!pembersihan) {
            return new NextResponse("Pembersihan is required", { status: 400});
        }

        if (!penggantian) {
            return new NextResponse("Penggantian is required", { status: 400});
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

        const reportMaintenanceByCategory = await prismadb.reportMaintenanceByCategory.create({
            data: {
                inspeksi,
                kalibrasi,
                pembersihan,
                penggantian,
                storeId: params.storeId
            }
        });

        return NextResponse.json(reportMaintenanceByCategory);

    } catch (error) {
        console.log('[REPORTMAINTENANCEBYCATEGORYS_POST]', error);
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

        const reportMaintenanceByCategory = await prismadb.reportMaintenanceByCategory.findMany({
           where: {
            storeId: params.storeId,
           },
        });

        return NextResponse.json(reportMaintenanceByCategory);

    } catch (error) {
        console.log('[REPORTMAINTENANCEBYCATEGORYS_GET]', error);
        return new NextResponse("Internal error", { status: 500 });      
    }
}