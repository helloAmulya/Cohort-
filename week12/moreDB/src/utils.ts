import dotenv from "dotenv";
dotenv.config();
import { Client } from "pg";


export async function getClient() {
  const client = new Client({
    connectionString: process.env.NEONDB_URI,
  });

  await client.connect();
  return client;
}
