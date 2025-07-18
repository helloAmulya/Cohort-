import express from "express";
import jwt from "jsonwebtoken";

// imp
const jwtPassword = "1234";

const port = 3000;
const app = express();

app.use(express.json());

const ALL_USERS = [
    {
        username: "harkirat@gmail.com",
        password: "123",
        name: "harkirat singh",
    },
    {
        username: "raman@gmail.com",
        password: "123321",
        name: "Raman singh",
    },
    {
        username: "priya@gmail.com",
        password: "123321",
        name: "Priya kumari",
    },
];

// function userExists(username, password) {
//     const userExists = false;
//     for (let i = 0; i < ALL_USERS.length; i++) {
//         if (
//             ALL_USERS[i].username == username &&
//             ALL_USERS[i].password == password
//         ) {
//             userExists = true;
//         }
//     }
//     return userExists;
// }

function userExists(username, password) {
    for (let i = 0; i < ALL_USERS.length; i++) {
        if (
            ALL_USERS[i].username === username &&
            ALL_USERS[i].password === password
        ) {
            return true;
        }
    }
    return false;
}


app.post("/signin", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (!userExists(username, password)) {
        return res.status(403).json({
            msg: "User doesnt exist in our in memory db",
        });
    }

    var token = jwt.sign({ username: username }, jwtPassword);
    return res.json({
        token,
    });
});

app.get("/users", function (req, res) {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    res.json({
        // users:ALL_USERS
        users: ALL_USERS.filter(function (value) {
            if (value.username == username) return false;
            else return true;
        }),
    });
    // try {
    //   const decoded = jwt.verify(token, jwtPassword);
    //   const username = decoded.username;
    // } catch (err) {
    //   return res.status(403).json({
    //     // msg: "Invalid token",
    //     // users:ALL_USERS
    //   });
    // }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
});
