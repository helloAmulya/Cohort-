
import { getClient } from "./utils.js";

async function trans(email: string, password: string, city: string, street: string) {
  const client = await getClient();

  try {
    await client.query("BEGIN");

    // Insert user and get their ID
    const userResult = await client.query(
      `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id`,
      [email, password]
    );

    const userId = userResult.rows[0].id;

    // Use that ID in address
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

// 👇 now no need to manually pass userId
trans("some@gmail.com", "hvvc", "Agra", "anyplace");
