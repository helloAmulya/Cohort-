import { Client } from 'pg'
import { DB_URL } from './config';

// export const client = new Client({
//     connectionString: DB_URL
// });



export async function getClient(){
    const client = new Client(DB_URL);
    await client.connect();
    return client;
}