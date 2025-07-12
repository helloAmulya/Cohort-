
import { PrismaClient } from '../generated/prisma'

const prisma = new PrismaClient()

async function main() {
    await prisma.post.create({
        data: {
            title: "title of post",
            content: "fdfdfdf",
            published: true,
            author: {
                connect: {
                    id: 1
                }
            }
        }
    })
}

main()
    .then(async () => {
        console.log("post created");
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })