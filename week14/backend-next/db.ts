
//  It is recommended to initialize the prisma client here in the db file

import { PrismaClient } from "./app/generated/prisma"

const client = new PrismaClient()

export default client;