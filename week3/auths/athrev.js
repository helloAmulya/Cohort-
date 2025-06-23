import express from 'express'
import jwt from 'jsonwebtoken'

const jwtPassword = "hardcodedPass1"

const PORT = 3001;
const app = express();

app.use(express.json());


const userData = [
    {
        username: "somename1",
        password: "somepass 1",

    },
    {
        username: "somename2",
        password: "somepass 2",

    },
    {
        username: "somename3",
        password: "somepass 3",

    },
]



function userExists(username, password) {
    for (let i = 0; i < userData.length; i++) {
        if (userData[i].username === username &&
            userData[i].password === password
        ) { return true }
    }
    return false
}


app.post('/login', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (!userExists(username, password)) {
        return res.status(403).json({
            msg: "User does not exists"
        })
    }
    var token = jwt.sign({ username: username }, jwtPassword)
    return res.json({
        token,
    })

})

app.get('/users', function (req, res) {
    const token = req.headers.authorization
    const decoded = jwt.verify(token, jwtPassword)
    const username = decoded.username

    res.json({
        users: userData.filter(function (value) {
            if (value.username == username) return false;
            else return true;

        }),
    })

})


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})


