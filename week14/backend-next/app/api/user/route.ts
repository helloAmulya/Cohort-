import { NextRequest, NextResponse } from "next/server";

// import { PrismaClient } from "@prisma/client"
// const client = new PrismaClient();


export function GET() {
    // database logic here (or static data)
    return Response.json({ // works only in Edge runtime , use NextResponse 
        email: "trst@gm.com",
        name: "trr",
    });
}


export async function POST(req: NextRequest) {
    const body = await req.json();
    // await client.user.create({
    //     username: body.username,
    //     password: body.passwords
    // })
    return NextResponse.json({
        message: "You are logged in"
    })

}
