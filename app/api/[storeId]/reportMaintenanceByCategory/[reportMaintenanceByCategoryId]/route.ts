import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET (
    req: Request,
    { params }: { params: { reportMaintenanceByCategoryId: string } }
) {
    try {
        if (!params.reportMaintenanceByCategoryId) { 
            return new NextResponse("Report Maintenance By Category id is required", { status: 400 });
        }

        const reportMaintenanceByCategory = await prismadb.reportMaintenanceByCategory.findUnique({
            where: {
                id: params.reportMaintenanceByCategoryId,
            }
        });

        return NextResponse.json(reportMaintenanceByCategory);

    } catch (error) {
        console.log('[REPORTMAINTENANCEBYCATEGORY_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function PATCH (
    req: Request,
    { params }: { params: { storeId: string,  reportMaintenanceByCategoryId: string } }
) {
    try {
        const { userId } = auth();
        const body = await req.json();

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

        if (!params.reportMaintenanceByCategoryId) { 
            return new NextResponse("Report Maintenance By Category id is required", { status: 400 });
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

        const reportMaintenanceByCategory = await prismadb.reportMaintenanceByCategory.updateMany({
            where: {
                id: params.reportMaintenanceByCategoryId,
            },
            data: {
                inspeksi,
                kalibrasi,
                pembersihan,
                penggantian
            }
        });

        return NextResponse.json(reportMaintenanceByCategory);

    } catch (error) {
        console.log('[REPORTMAINTENANCEBYCATEGORY_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function DELETE (
    req: Request,
    { params }: { params: { storeId: string, reportMaintenanceByCategoryId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!params.reportMaintenanceByCategoryId) { 
            return new NextResponse("Report Maintenance By Category id is required", { status: 400 });
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

        const reportMaintenanceByCategory = await prismadb.reportMaintenanceByCategory.deleteMany({
            where: {
                id: params.reportMaintenanceByCategoryId,
            }
        });

        return NextResponse.json(reportMaintenanceByCategory);

    } catch (error) {
        console.log('[REPORTMAINTENANCEBYCATEGORY_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

