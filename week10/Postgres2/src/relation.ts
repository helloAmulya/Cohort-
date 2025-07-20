import { Client } from "pg"
import dotenv from "dotenv"
dotenv.config()

const client = new Client({
    connectionString: process.env.NEONDB_URI,
})

client.connect()

// relation here means relating the databases (tables and rows) . joins work as getting a specific data and other data with it. in simple terms, joins are used to get the related data( from the rows and tables )

