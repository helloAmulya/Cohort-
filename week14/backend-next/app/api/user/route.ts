import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "../../generated/prisma"

const prisma = new PrismaClient();

// epxort all users
export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users);
    } catch (error) {
        console.error("GET error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// export only latest user
// export async function GET() {
//     const latestUser = await client.user.findFirst({
//         orderBy: { id: "desc" },
//     });
//     return NextResponse.json(latestUser);
// }




// minimal post request
// export async function POST(req: NextRequest) {
//     const body = await req.json();
//     await client.user.create({
//         data: {
//             username: body.username,
//             password: body.password
//         }
//     })
//     return NextResponse.json({
//         message: "You are logged in"
//     })

// }


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const existingUser = await prisma.user.findFirst({
            where: {
                username: body.username
            }
        })
        if (existingUser) { return NextResponse.json({ error: "user already exists" }) }
        const user = await prisma.user.create({
            data: {
                username: body.username,
                password: body.password,
            },
        });
        return NextResponse.json({
            message: "User created successfully",
            user,
        }, {
            status: 409
        });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 411 });
    }
}
