import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET (
    req: Request,
    { params }: { params: { pelangganId: string } }
) {
    try {
        if (!params.pelangganId) { 
            return new NextResponse("Pelanggan id is required", { status: 400 });
        }

        const pelanggan = await prismadb.pelanggan.findUnique({
            where: {
                id: params.pelangganId,
            }
        });

        return NextResponse.json(pelanggan);

    } catch (error) {
        console.log('[PELANGGAN_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function PATCH (
    req: Request,
    { params }: { params: { storeId: string,  pelangganId: string } }
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
       

        if (!params.pelangganId) { 
            return new NextResponse("Pelanggan id is required", { status: 400 });
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

        const pelanggan = await prismadb.pelanggan.updateMany({
            where: {
                id: params.pelangganId,
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

        return NextResponse.json(pelanggan);

    } catch (error) {
        console.log('[PELANGGAN_PATCH]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

export async function DELETE (
    req: Request,
    { params }: { params: { storeId: string, pelangganId: string } }
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!params.pelangganId) { 
            return new NextResponse("Pelanggan id is required", { status: 400 });
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

        const pelanggan = await prismadb.pelanggan.deleteMany({
            where: {
                id: params.pelangganId,
            }
        });

        return NextResponse.json(pelanggan);

    } catch (error) {
        console.log('[PELANGGAN_DELETE]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
};

