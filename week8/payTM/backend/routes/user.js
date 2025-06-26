import express from "express";
import { z } from 'zod'
import { User, Account } from "../db"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import authMiddleware from "../middleware/auth";

import JWT_SECRET from "../config";
const router = express.Router();

const signupSchema = z.object({
    username: z.string().email(), // this is email as username
    password: z.string().min(6, 'password should be atleast 6 characters'),
    firstName: z.string().min(3, 'firstname is required'),
    lastName: z.string()
})


router.post("/signup", async (req, res) => {

    const body = req.body;

    const result = signupSchema.safeParse(body);
    if (!result.success) {
        return res.status(411).json({
            msg: "Invalid input",
            errors: result.error.format(),
        });
    }
    const { password, username, firstName, lastName } = result.data;
    const userExists = await User.findOne({ username });
    if (userExists) {
        return res.status(411).json({ msg: "Email already taken" });
    }


    // Hash password
    const hashedPassword = await bcrypt.hash(body.password, 10); // here 10 is salt round, to diff the hashed pass

    const dbUser = await User.create({
        username,
        password: hashedPassword,
        firstName,
        lastName,
    });
    const userId = dbUser._id

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })
    const token = jwt.sign({
        userId,
    }, JWT_SECRET)
    res.json({
        message: "User created Successfully",
        token: token
    })

})


router.get('/signin', authMiddleware, async (req, res) => {

    // const result = userSchema.safeParse(req.body)
    // if(!result.success){
    //     return res.status(400).json(result.error.errors)
    // }

    // const {username, password} = result.data

    //     const validUser = await User.findOne({
    //         username,
    //         password
    //     })

    //     if(validUser){
    //         res.status(200).json({
    //             msg: "user Signedin Successfully"
    //         })
    //     } else {

    //         res.status(404).json({
    //             msg: "wrong inputs"
    //         })
    //     }

    res.json({
        msg: 'successfully signed in',
    });
});


module.exports = router;