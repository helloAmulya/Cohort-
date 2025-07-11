### week10/Postgres-Demo/src/create-index.ts

import { getClient } from "./utils.js";

async function addIndex() {
    const client = await getClient();
    
    const createIndexQuery = 'CREATE INDEX idx_todos_user_id ON todos(user_id)';
    await client.query(createIndexQuery);
    
    console.log("Index added successfully on user_id column of todos table!");
}

addIndex();

---

### week10/Postgres-Demo/src/create-table.ts

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


    await client.query(createUserTableQuery);

    const createTodosQuery = `
        CREATE TABLE todos (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT,
            user_id INTEGER REFERENCES users(id),
            done BOOLEAN DEFAULT FALSE
        );
    `;


    await client.query(createTodosQuery);

    console.log("Table created successfully!");
}



createTable();
---

### week10/Postgres-Demo/src/delete-data.ts

import { getClient } from "./utils.js";

async function deleteTodo(todoId: number) {
    const client = await getClient();
    
    const deleteTodoText = 'DELETE FROM todos WHERE id = $1';
    await client.query(deleteTodoText, [todoId]);
    
    console.log(`Todo with ID ${todoId} deleted!`);
}

const todoIdToDelete = 1;
deleteTodo(todoIdToDelete);

---

### week10/Postgres-Demo/src/get-data.ts

import { getClient } from "./utils.js";

async function getUsers() {
    const client = await getClient();
    
    const selectUsersText = 'SELECT * FROM users';
    const userRes = await client.query(selectUsersText);
    
    console.log("Users:");
    for (let user of userRes.rows) {
        console.log(`ID: ${user.id}, Email: ${user.email}`);
    }
}

async function getUserFromEmail(email: string) {
    const client = await getClient();
    
    const selectUserText = 'SELECT * FROM users WHERE email = $1';
    const userRes = await client.query(selectUserText, [email]);
    
    console.log("Single User detail:");
    for (let user of userRes.rows) {
        console.log(`ID: ${user.id}, Email: ${user.email}`);
    }
}

async function getTodosForUser(userId: number) {
    const client = await getClient();
    
    const selectTodosText = 'SELECT * FROM todos WHERE user_id = $1';
    const todoRes = await client.query(selectTodosText, [userId]);
    
    console.log(`Todos for User ID ${userId}:`);
    for (let todo of todoRes.rows) {
        console.log(`ID: ${todo.id}, Title: ${todo.title}, Description: ${todo.description}, Done: ${todo.done}`);
    }
}

getUsers();

getUserFromEmail("john.do11e@gmail2.com")

const userIdToFetch = 1;
getTodosForUser(userIdToFetch);
---

### week10/Postgres-Demo/src/insert-data.ts

import { getClient } from "./utils.js";

async function createEntries() {
    const client = await getClient();
    const insertUserText = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id';
    const userValues = ['john.34234@gmail2.com', 'hashed_password_here'];

    let response = await client.query(insertUserText, userValues);
    const insertTodoText = 'INSERT INTO todos (title, description, user_id, done) VALUES ($1, $2, $3, $4) RETURNING id';
    const todoValues = ['Buy groceries', 'Milk, bread, and eggs', response.rows[0].id, false];
    await client.query(insertTodoText, todoValues);

    console.log("Entries created!");
}



createEntries();
---

### week10/Postgres-Demo/src/joins/advance-1.ts

import { getClient } from "../utils";

// Get all todos for a give user
// This needs to ensure that every user comes atleast once
async function getUserAndTodosWithJoin(userId: number) {
    const client = await getClient();

    const joinQuery = `
        SELECT users.*, todos.title, todos.description, todos.done
        FROM users
        LEFT JOIN todos ON users.id = todos.user_id
        WHERE users.id = $1;
    `;

    const res = await client.query(joinQuery, [userId]);
    const results = res.rows;

    console.log("User and Todos:", results);
}

getUserAndTodosWithJoin(1)
---

### week10/Postgres-Demo/src/joins/advance-2.ts

import { getClient } from "../utils";

// Get all todos for a give user
// This shouldnt return a row if no todos exist for the user
async function getUserAndTodosWithJoin(userId: number) {
    const client = await getClient();

    const joinQuery = `
        SELECT users.*, todos.title, todos.description, todos.done
        FROM users
        JOIN todos ON users.id = todos.user_id
        WHERE users.id = $1;
    `;

    const res = await client.query(joinQuery, [userId]);
    const results = res.rows;

    console.log("User and Todos:", results);
}

getUserAndTodosWithJoin(5)
---

### week10/Postgres-Demo/src/joins/advance-3.ts

import { getClient } from "../utils";

async function getAllTodosWithUserDetails() {
    const client = await getClient();

    const joinQuery = `
        SELECT todos.*, users.email, users.password
        FROM todos
        JOIN users ON todos.user_id = users.id;
    `;

    const res = await client.query(joinQuery);
    const results = res.rows;

    console.log("Todos with User Details:", results);
}

getAllTodosWithUserDetails();

---

### week10/Postgres-Demo/src/joins/basic.ts

import { getClient } from "../utils";

async function getUserAndTodosSeparateQueries(userId: number) {
    const client = await getClient();

    // Fetch user details
    const userQuery = 'SELECT * FROM users WHERE id = $1';
    const userRes = await client.query(userQuery, [userId]);
    const user = userRes.rows[0];

    // Fetch todos for the user
    const todosQuery = 'SELECT * FROM todos WHERE user_id = $1';
    const todosRes = await client.query(todosQuery, [userId]);
    const todos = todosRes.rows;

    console.log("User Details:", user);
    console.log("Todos:", todos);
}

getUserAndTodosSeparateQueries(1);
---

### week10/Postgres-Demo/src/update-data.ts

import { getClient } from "./utils.js";

async function updateTodo(todoId: number) {
    const client = await getClient();
    
    const updateTodoText = 'UPDATE todos SET done = $1 WHERE id = $2';
    await client.query(updateTodoText, [true, todoId]);
    
    console.log(`Todo with ID ${todoId} updated to done!`);
}

const todoIdToUpdate = 1;
updateTodo(todoIdToUpdate);

---

### week10/Postgres-Demo/src/utils.ts

import pkg from 'pg';
const { Client } = pkg;

export async function getClient() {
    const client = new Client("postgresql://neondb_owner:npg_Ziy59mOURjsC@ep-billowing-sunset-adeueuyq-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require")
    await client.connect();
    return client;
}



---

