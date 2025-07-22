import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()


async function insertUser(email: string, password: string, firstName: string, lastName: string) {
    const res = await prisma.user.create({
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
    })

    console.log(res)
}

// updating data
interface updateParams {
    firstName: string;
    lastName: string;
}
async function updateUser(username: string, { firstName, lastName }: updateParams) {
    const res = await prisma.user.update({

        where: {
            email: username,
        },
        data: {
            firstName,
            lastName,
        }
    })
    console.log("updated the user :: ", res)
}

// insertUser("some2@gmail.com", "pass", "first", "last")

// updateUser("some1@gmail.com", {
//     firstName: "upfirst",
//     lastName: "uplast"
// })


async function insertTodo(title: string, description: string, status: boolean, userId: number) {
    const res = await prisma.todos.create({
        data: {
            title,
            description,
            status,
            userId

        }
    })
    console.log("Todo added :: ", res)
}

// insertTodo(
//     "todo1",
//     "desc 1",
//     false,
//     2,
// )



// getting user and also the todos in it
async function getUser(username: string) {
    const res = await prisma.user.findUnique({
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
    })
    console.log("User Fetched :: ", res)

}

getUser("some1@gmail.com")