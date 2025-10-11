import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest) {
    const session = await getServerSession();
    if (!session?.user?.email) {
        return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
    }

    try {
        const userId = session.user.email;
        const streams = await prisma.stream.findMany({
            where: {
                userId,
            },
            include: {
                _count: {
                    select: {
                        upvotes: true,
                    },
                },
                upvotes: {
                    where: {
                        userId,
                    },
                },
            },
        });

        const processedStreams = streams.map(({ _count, upvotes, ...rest }) => ({
            ...rest,
            upvotes: _count.upvotes,
            haveUpvoted: upvotes.length > 0,
        }));

        return NextResponse.json({ streams: processedStreams });
    } catch (error) {
        console.error("Error fetching streams:", error);
        return NextResponse.json({ message: "Error fetching streams" }, { status: 500 });
    }
}





