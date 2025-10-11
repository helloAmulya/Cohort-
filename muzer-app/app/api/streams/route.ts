import { NextRequest, NextResponse } from "next/server";
import { z } from "zod"
import { prisma } from "@/app/lib/db"
import youtubesearchapi from "youtube-search-api"



import { getServerSession } from "next-auth";

// Define a validation schema for incoming data.
const StreamSchema = z.object({
    url: z.string().refine(url => YT_REGEX.test(url) || SPOTIFY_REGEX.test(url), {
        message: "Invalid URL. Only YouTube and Spotify links are supported.",
    }),
});

// Regular expressions for YouTube and Spotify URLs.
const YT_REGEX = /^https?:\/\/(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:v\/|embed\/|watch\?v=))([^#&?]*).*/;
const SPOTIFY_REGEX = /^(?:https?:\/\/)?(?:open\.)?spotify\.com\/[^\s]+$/;



export async function POST(req: NextRequest) {
    const session = await getServerSession();
    if (!session?.user?.email) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const data = StreamSchema.parse(await req.json());
        const userId = session.user.email;

        let extractedId: string;
        let type: "Youtube" | "Spotify";

        if (YT_REGEX.test(data.url)) {
            const match = data.url.match(YT_REGEX);
            extractedId = match?.[1] ?? data.url;
            type = "Youtube";
        } else {
            const parts = data.url.split("/");
            extractedId = parts[parts.length - 1].split("?")[0];
            type = "Spotify";
        }

        const videoDetails = await youtubesearchapi.GetVideoDetails(extractedId);
        const thumbnails = videoDetails.thumbnail.thumbnails.sort((a:any, b:any) => a.width - b.width);

        const stream = await prisma.stream.create({
            data: {
                userId,
                url: data.url,
                extractedId,
                type,
                title: videoDetails.title ?? "Title not found",
                smallImg: thumbnails[thumbnails.length - 2]?.url ?? "",
                bigImg: thumbnails[thumbnails.length - 1]?.url ?? "",
            },
        });

        return NextResponse.json({ message: "Stream added successfully", id: stream.id }, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: error.errors[0].message }, { status: 400 });
        }
        console.error("Error creating stream:", error);
        return NextResponse.json({ message: "Error creating stream" }, { status: 500 });
    }
}


export async function GET(req: NextRequest) {
    const creatorId = req.nextUrl.searchParams.get("creatorId");
    if (!creatorId) {
        return NextResponse.json({ message: "Creator ID is required" }, { status: 400 });
    }

    try {
        const streams = await prisma.stream.findMany({
            where: { userId: creatorId },
        });
        return NextResponse.json({ streams });
    } catch (error) {
        console.error("Error fetching streams:", error);
        return NextResponse.json({ message: "Error fetching streams" }, { status: 500 });
    }
}