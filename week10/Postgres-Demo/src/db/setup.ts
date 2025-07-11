
import { getClient } from '../index';
// import { client} from '../index';


async function createTables() {
    const client = await getClient();
    const createUserTableQuery = (`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL
        );
    `); 
    await client.query(createUserTableQuery);

    // export async function createTables() {
    //     await client.query(`
    //         CREATE TABLE IF NOT EXISTS users (
    //             id SERIAL PRIMARY KEY,
    //             username VARCHAR(255) UNIQUE NOT NULL,
    //             password VARCHAR(255) NOT NULL,
    //             name VARCHAR(255) NOT NULL
    //         );
    //     `);



    const createTodosQuery = (`
        CREATE TABLE todos (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        user_id INTEGER REFRENCES users(id)

        
        )
        `)

    await client.query(`
        CREATE TABLE IF NOT EXISTS todos (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id),
            title VARCHAR(255) NOT NULL,
            description TEXT,
            done BOOLEAN DEFAULT false
        );
    `);
}

export async function dropTables() {
    await client.query(`DROP TABLE IF EXISTS todos;`);
    await client.query(`DROP TABLE IF EXISTS users;`);
}

module.exports = { createTables, dropTables };
