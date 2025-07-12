import { statSync } from 'fs'
import { PrismaClient } from '../generated/prisma'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
     email: "some1@gmail.com",
     name: "tstuser",
            posts: {
                create: [

                    {
                        title: "postone",
                        content: "testing",
                        published: true,
                    },
                    {
                        title: "post 2",
                        content: "testing",
                        published: true,

                    }
                ]
            }

        },
    });

    console.log("user & posts created");
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

