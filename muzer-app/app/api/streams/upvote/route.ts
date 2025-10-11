// In api/streams/upvote/route.ts
import { prisma } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const UpvoteSchema = z.object({
  streamId: z.string(),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = UpvoteSchema.parse(await req.json());
    const userId = session.user.email;

    await prisma.upvote.create({
      data: {
        userId,
        streamId: data.streamId,
      },
    });

    return NextResponse.json({ message: "Upvoted successfully" }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }
    // Check for unique constraint violation
    if ((error as any).code === "P2002") {
      return NextResponse.json({ message: "Already upvoted" }, { status: 409 });
    }
    console.error("Upvote error:", error);
    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
  }
}
