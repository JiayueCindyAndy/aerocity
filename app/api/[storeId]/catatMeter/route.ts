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

        const { name, type, key, label, formula, show, editable, require, initialValue } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        if (!type) {
            return new NextResponse("Type is required", { status: 400 });
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

        const catatMeter = await prismadb.catatMeter.create({
            data: {
                name,
                type,
                key,
                label,
                formula,
                show,
                editable,
                require,
                initialValue,
                storeId: params.storeId
            }
        });

        return NextResponse.json(catatMeter);

    } catch (error) {
        console.log('[CATATMETERS_POST]', error);
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

        const catatMeters = await prismadb.catatMeter.findMany({
           where: {
            storeId: params.storeId,
           },
        });

        return NextResponse.json(catatMeters);

    } catch (error) {
        console.log('[CATATMETERS_GET]', error);
        return new NextResponse("Internal error", { status: 500 });      
    }
}