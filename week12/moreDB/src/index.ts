import { getClient } from "./utils.js";

async function createTable() {
    const client = await getClient();
    const createUserTableQuery = `
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        );
    `;


    // await client.query(createUserTableQuery);
    // console.log("Table created")

}

async function insertData(email: string, password: string) {
    const client = await getClient();

    const result = await client.query(`
        INSERT INTO users (email,password)
        VALUES ('$1','$2')
        `, [email, password])
    console.log("added :: ", result)
    // VALUES ('${email}','${password}') /// not preferred syntax
}

// insertData("amul1@gmail.com", "sdfd");



async function address() {
    const client = await getClient();

    const createAddressTable = `
    CREATE TABLE address (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    city VARCHAR(100) NOT NULL,
    street VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
    )
    `;
    await client.query(createAddressTable)
    console.log("table created  ")
}

// address();



async function addLocation(userId: number, city: string, street: string) {
  const client = await getClient();

  const result = await client.query(
    `INSERT INTO address (user_id, city, street) VALUES ($1, $2, $3)`,
    [userId, city, street]
  );

  console.log("location added:", result.rowCount);
}

addLocation(1, "bahraich", "hidden place")