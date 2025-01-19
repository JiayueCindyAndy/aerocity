import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET (
    req: Request,
    { params }: { params: { reportMaintenanceByAreaId: string } }
) {
    try {
        if (!params.reportMaintenanceByAreaId) { 
            return new NextResponse("Report Maintenance By Area id is required", { status: 400 });
        }

        const reportMaintenanceByArea = await prismadb.reportMaintenanceByArea.findUnique({
            where: {
                id: params.reportMaintenanceByAreaId,
            }
        });

        return NextResponse.json(reportMaintenanceByArea);

    } catch (error) {
        console.log('[REPORTMAINTENANCEBYAREA_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function PATCH (
    req: Request,
    { params }: { params: { storeId: string,  reportMaintenanceByAreaId: string } }
) {
    try {
        const { userId } = auth();
        const body = await req.json();

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

        if (!params.reportMaintenanceByAreaId) { 
            return new NextResponse("Report Maintenance By Area id is required", { status: 400 });
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

        const reportMaintenanceByArea = await prismadb.reportMaintenanceByArea.updateMany({
            where: {
                id: params.reportMaintenanceByAreaId,
            },
            data: {
                bmkg,
                airNav,
                pla,
                ptBib
            }
        });

        return NextResponse.json(reportMaintenanceByArea);

    } catch (error) {
        console.log('[REPORTMAINTENANCEBYAREA_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function DELETE (
    req: Request,
    { params }: { params: { storeId: string, reportMaintenanceByAreaId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!params.reportMaintenanceByAreaId) { 
            return new NextResponse("Report Maintenance By Area id is required", { status: 400 });
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

        const reportMaintenanceByArea = await prismadb.reportMaintenanceByArea.deleteMany({
            where: {
                id: params.reportMaintenanceByAreaId,
            }
        });

        return NextResponse.json(reportMaintenanceByArea);

    } catch (error) {
        console.log('[REPORTMAINTENANCEBYAREA_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

