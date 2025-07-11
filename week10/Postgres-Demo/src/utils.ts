import pkg from 'pg';
const { Client } = pkg;

export async function getClient() {
    const client = new Client("postgresql://neondb_owner:npg_Ziy59mOURjsC@ep-billowing-sunset-adeueuyq-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require")
    await client.connect();
    return client;
}


