import { statSync } from 'fs'
import { PrismaClient } from '../generated/prisma'

const prisma = new PrismaClient()

async function main() {
    await prisma.user.create({
        data: {
            email: "some@gmail.com",
            name: "some",
        },
    });

    console.log("User created successfully.");
}


main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

