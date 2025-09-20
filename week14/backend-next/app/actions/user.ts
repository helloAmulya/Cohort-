"use server"
//  this is to make server actions

import prisma from "@/db"

export async function signup(username: string, password: string) {

    try {
        await prisma.user.create({
            data: {
                username: username,
                password: password
            }
        });
        return true
    }
    catch (e) {
        return false

    }

}



