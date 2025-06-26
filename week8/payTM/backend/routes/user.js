import express from "express";
import { z } from 'zod'
import { User } from "../db"
import jwt from "jsonwebtoken"
import JWT_SECRET from "../config";
const router = express.Router();

const signupSchema = z.object({

    username: z.string().email(), // this is email as username
    password: z.string().min(6, 'password should be atleast 6 characters'),
    firstName: z.string().min(3, 'firstname is required'),
    lastName: z.string()
})


router.post("/signup", async (req, res) => {
    const body = req.body
    const { success } = signupSchema.safeParse(body)
    if (!success) {
        return res.json({
            msg: "Email already taken / Incorrect"
        })
    }

    const user = User.findOne({ username: body.username })
    if (user._id) {
        return res.json({
            msg: "Email already taken / Incorrect"
        })
    }

    const dbUser = await new User.create(body);
    const token = jwt.sign({
        userId: dbUser._id,
    }, JWT_SECRET)
    res.json({
        message: "User created Successfully",
        token: token
    })

})
router.post("/signin", async (req, res) => {

})

module.exports = router;