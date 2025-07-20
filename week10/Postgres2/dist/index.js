"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new pg_1.Client({
    connectionString: process.env.NEONDB_URI,
});
client.connect();
function createUsersTable() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield client.query(`
        CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
        `);
        console.log("result: " + result);
    });
}
function insertData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pushCom = `INSERT INTO users (username, password,email) VALUES ($1,$2,$3)`;
            const values = ['user4', 'pass4', 't4@gmail.com'];
            const pushedData = yield client.query(pushCom, values);
            console.log("success: ", pushedData);
        }
        catch (error) {
            console.log("Error inserting data :: ", error);
        }
        finally {
            yield client.end();
        }
    });
}
function getAllUser() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pullCom = 'SELECT * FROM users';
            const pullData = yield client.query(pullCom);
            console.log("All users:", pullData.rows);
        }
        catch (error) {
            console.log("Error getting users data  :: ", error);
        }
        finally {
            yield client.end();
        }
    });
}
function getUserData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pullCom = 'SELECT * FROM users WHERE email = $1';
            const values = ['t4@gmail.com'];
            const pullData = yield client.query(pullCom, values);
            console.log("User:", pullData.rows[0]);
        }
        catch (error) {
            console.log("Error getting users data  :: ", error);
        }
        finally {
            yield client.end();
        }
    });
}
getUserData();
