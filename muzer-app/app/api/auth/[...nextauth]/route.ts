import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@/app/lib/db";
import { User } from "@prisma/client";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
            authorization: {
                params: {
                    prompt: "select_account"
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET ?? "secret",
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (!user.email) {
                return false;
            }
            const dbUser = await prisma.user.findFirst({
                where: {
                    email: user.email
                }
            })
            if (!dbUser) {
                await prisma.user.create({
                    data: {
                        email: user.email,
                        provider: "Google"
                    }
                })
            }
            return true;

        }

    }
})

export { handler as GET, handler as POST }




// import { NextResponse } from "next/server";

// now each route "/api/auth/anyroute" will show the "hi there"
// export function GET(){
//     return NextResponse.json({
//         message:"Hi there"
//     })
// } 
