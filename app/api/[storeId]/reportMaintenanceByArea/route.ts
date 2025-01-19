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

        const { bmkg, airNav, pla, ptBib } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!bmkg) {
            return new NextResponse("BMKG is required", { status: 400});
        }

        if (!pla) {
            return new NextResponse("PLA is required", { status: 400});
        }

        if (!airNav) {
            return new NextResponse("Air Nav is required", { status: 400});
        }

        if (!ptBib) {
            return new NextResponse("PT BIB is required", { status: 400});
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

        const reportMaintenanceByArea = await prismadb.reportMaintenanceByArea.create({
            data: {
                bmkg,
                pla,
                airNav,
                ptBib,
                storeId: params.storeId
            }
        });

        return NextResponse.json(reportMaintenanceByArea);

    } catch (error) {
        console.log('[REPORTMAINTENANCEBYAREAS_POST]', error);
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

        const reportMaintenanceByArea = await prismadb.reportMaintenanceByArea.findMany({
           where: {
            storeId: params.storeId,
           },
        });

        return NextResponse.json(reportMaintenanceByArea);

    } catch (error) {
        console.log('[REPORTMAINTENANCEBYAREAS_GET]', error);
        return new NextResponse("Internal error", { status: 500 });      
    }
}