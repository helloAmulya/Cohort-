
import { getClient } from "./utils.js";

async function trans(email: string, password: string, city: string, street: string) {
    const client = await getClient();

    try {
        await client.query("BEGIN");


        const userResult = await client.query(
            `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id`,
            [email, password]
        );
        const userId = userResult.rows[0].id;


        await client.query(
            `INSERT INTO address (user_id, city, street) VALUES ($1, $2, $3)`,
            [userId, city, street]
        );

        await client.query("COMMIT");

        console.log("Transaction completed");
    } catch (err) {
        await client.query("ROLLBACK");
        console.error("Transaction failed. Rolled back.", err);
    } finally {
        await client.end();
    }
}

// trans("some@gmail.com", "hvvc", "Agra", "anyplace");



//  joins in sql 

async function joinUsersWithAddress() {
    const client = await getClient();

    try {
        const result = await client.query(`
      SELECT 
        users.id AS user_id,
        users.email,
        address.city,
        address.street
      FROM users
      INNER JOIN address ON users.id = address.user_id
    `);

        console.log("Joined data:");
        console.table(result.rows);
    } catch (err) {
        console.error("Error during join:", err);
    } finally {
        await client.end();
    }
}

joinUsersWithAddress();
