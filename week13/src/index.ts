import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB

async function insertUser(name: string, password: string, email: string) {

    const res = await prisma.user.create({
        data: {
            name,
            password,
            email,

        }
    })
    console.log(res)
}

insertUser('amul', 'passs', 'some1@gmail.com')