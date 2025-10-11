import { prisma } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const DownvoteSchema = z.object({
  streamId: z.string(),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = DownvoteSchema.parse(await req.json());
    const userId = session.user.email;

    await prisma.upvote.delete({
      where: {
        userId_streamId: {
          userId,
          streamId: data.streamId,
        },
      },
    });

    return NextResponse.json({ message: "Downvoted successfully" }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }
    // Handle cases where the upvote to be deleted is not found
    if ((error as any).code === "P2025") {
      return NextResponse.json({ message: "Upvote not found" }, { status: 404 });
    }
    console.error("Downvote error:", error);
    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
  }
}