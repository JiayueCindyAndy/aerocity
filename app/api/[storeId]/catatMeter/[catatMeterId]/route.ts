import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET (
    req: Request,
    { params }: { params: { catatMeterId: string } }
) {
    try {
        if (!params.catatMeterId) { 
            return new NextResponse("Catat Meter id is required", { status: 400 });
        }

        const catatMeter = await prismadb.catatMeter.findUnique({
            where: {
                id: params.catatMeterId,
            }
        });

        return NextResponse.json(catatMeter);

    } catch (error) {
        console.log('[CATATMETER_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function PATCH (
    req: Request,
    { params }: { params: { storeId: string,  catatMeterId: string } }
) {
    try {
        const { userId } = auth();
        const body = await req.json();

        const { name, type, key, label, formula, show, editable, require, initialValue } = body; 

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400});
        }

        if (!type) {
            return new NextResponse("Type is required", { status: 400});
        }
       

        if (!params.catatMeterId) { 
            return new NextResponse("Catat Meter id is required", { status: 400 });
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

        const catatMeter = await prismadb.catatMeter.updateMany({
            where: {
                id: params.catatMeterId,
            },
            data: {
                name,
                type,
                key,
                label,
                formula,
                show,
                editable,
                require,
                initialValue
            }
        });

        return NextResponse.json(catatMeter);

    } catch (error) {
        console.log('[CATATMETER_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function DELETE (
    req: Request,
    { params }: { params: { storeId: string, catatMeterId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!params.catatMeterId) { 
            return new NextResponse("Catat Meter id is required", { status: 400 });
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

        const catatMeter = await prismadb.catatMeter.deleteMany({
            where: {
                id: params.catatMeterId,
            }
        });

        return NextResponse.json(catatMeter);

    } catch (error) {
        console.log('[CATATMETER_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

