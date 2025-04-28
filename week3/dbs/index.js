import express from "express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
const jwtPassword = "1234"

// connecting with mongoDB
mongoose.connect('mongodb+srv://daddyAmulya:daddyAmulya@cluster0.gldtjmy.mongodb.net/user_app');

const port = 3000
const app = express()

app.use(express.json())

// defining the Schema, means to tell what type of data we are going to send
const User = mongoose.model('Users', { name: String, email: String, password: String });


// setting the post request with user verification

app.post("/signup", async function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        return res.status(400).send("userName already exists")
    }

    const user = new User({
        name: name,
        email: email,
        password: password,
    });
    user.save()
    res.json({
        msg: "User created successfully"
    })
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})


/*
        In the Postman , make a new POST request and type -> http://localhost:3000/signup
        after that in the body, pass -> 
        {
             "name": "test1",
             "email": "rtst@gmail.com",
             "password": "343"
        }

        it wil return ->

        {
            "msg": "User created successfully"
        }


 */