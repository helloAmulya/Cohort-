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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function insertUser(email, password, firstName, lastName) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.create({
            data: {
                email,
                password,
                firstName,
                lastName
            },
            // the below will return
            select: {
                id: true,
                password: true,
            }
        });
        console.log(res);
    });
}
function updateUser(username_1, _a) {
    return __awaiter(this, arguments, void 0, function* (username, { firstName, lastName }) {
        const res = yield prisma.user.update({
            where: {
                email: username,
            },
            data: {
                firstName,
                lastName,
            }
        });
        console.log("updated the user :: ", res);
    });
}
// insertUser("some2@gmail.com", "pass", "first", "last")
// updateUser("some1@gmail.com", {
//     firstName: "upfirst",
//     lastName: "uplast"
// })
function insertTodo(title, description, status, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.todos.create({
            data: {
                title,
                description,
                status,
                userId
            }
        });
        console.log("Todo added :: ", res);
    });
}
// insertTodo(
//     "todo1",
//     "desc 1",
//     false,
//     2,
// )
// getting user and also the todos in it
function getUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield prisma.user.findUnique({
            where: {
                email: username
            },
            // return only what required
            select: {
                email: true,
                firstName: true,
                lastName: true,
                // we can directly fetch todos from here or later on call them 
                Todos: true,
            }
        });
        console.log("User Fetched :: ", res);
    });
}
getUser("some1@gmail.com");
