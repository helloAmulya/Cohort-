"use server"
//  this is to make server actions

import client from "@/db"

export async function signup(username: string, password: string) {

    try {
        await client.user.create({
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



