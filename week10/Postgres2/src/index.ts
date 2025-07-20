import { Client } from "pg"
import dotenv from "dotenv"
dotenv.config()

const client = new Client({
    connectionString: process.env.NEONDB_URI,
})

client.connect()


async function createUsersTable() {
    const result = await client.query(`
        CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
        `)
    console.log("result: " + result);
}
// createUsersTable();


// inserting the data in the users table
async function insertData() {
    try {

        const pushCom = `INSERT INTO users (username, password,email) VALUES ($1,$2,$3)`
        const values = ['user4', 'pass4', 't4@gmail.com'];

        // const pushedData = await client.query(`
        // INSERT INTO users (username, email, password)
        // VALUES ('user3', 'pass3','t3@gmail.com')
        // `)
        const pushedData = await client.query(pushCom, values)
        console.log("success: ", pushedData);
    } catch (error) {
        console.log("Error inserting data :: ", error)
    }
    finally {
        await client.end()
    }

}

/*
    sql injection refers to the custom sql command passing in the input, which can result in database editing and destructuring; to prevent this

    we use  VALUES ($1,$2,$3), this will be treated as a string and not as a sql query,
    then describe the values = (username, password,email)
    and pass with the insert data nd the values.
 
*/
async function getAllUser() {
    try {
        const pullCom = 'SELECT * FROM users';
        const pullData = await client.query(pullCom);
        console.log("All users:", pullData.rows);
    } catch (error) {
        console.log("Error getting users data  :: ", error);
    } finally {
        await client.end();
    }
}


async function getUserData() {
    try {
        const pullCom = 'SELECT * FROM users WHERE email = $1';
        const values = ['t4@gmail.com']; // search specific user by email
        const pullData = await client.query(pullCom, values);
        // this returns too much unnecessary data
        // console.log("Fetching user success : ", pullData);

        console.log("User:", pullData.rows[0]); // only required data
        // pullData.rows.forEach(user => console.log(user)); // get all users


    } catch (error) {
        console.log("Error getting users data  :: ", error);
    } finally {
        await client.end();
    }
}
getUserData();