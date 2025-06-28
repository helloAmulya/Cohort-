import express from "express";
import { z } from 'zod'
import { User, Account } from "../db.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";

import authMiddleware from '../middleware/auth.js';


import JWT_SECRET from "../config/jwtConfig.js";

const router = express.Router();

const signupSchema = z.object({
    username: z.string().email(), // this is email as username
    password: z.string().min(6, 'password should be atleast 6 characters'),
    firstName: z.string().min(3, 'firstname is required'),
    lastName: z.string()
})

const signinSchema = z.object({
    username: z.string().email(),
    password: z.string().optional(),

})

const updateUserSchema = z.object({

    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
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


router.post('/signin', async (req, res) => {

    const body = req.body;
    const result = signinSchema.safeParse(body);

    if (!result.success) {
        return res.status(401).json({
            message: "Invalid inputs"
        })
    }
    const { password, username } = result.data;


    // first we look. for the user through the username
    const userExists = await User.findOne({ username })
    if (!userExists) {
        return res.status(401).json({
            message: "User not found",
        });
    }


    // check for password
    const passwordMatch = await bcrypt.compare(password, userExists.password);
    if (!passwordMatch) {
        return res.status(401).json({
            message: "Incorrect password",
        });
    }



    const token = jwt.sign({ userId: userExists._id }, JWT_SECRET, {
        expiresIn: "1h",
    });

    return res.status(200).json({
        message: "Successfully signed in",
        token,
    });
});

// authmiddleware is only required for protected routes, not for signin and signup,
//  for like getting balance details, user dashboard etc 
// we need to automatically pass the token for authorization 





router.put('/update', authMiddleware, async (req, res) => {
    const body = req.body;
    const result = updateUserSchema.safeParse(body);

    if (!result.success) {
        return res.status(411).json({
            message: "Error while updating information",
            errors: result.error.format()
        });
    }

    await User.updateOne(
        { _id: req.userId },
        { $set: result.data }
    );

    res.json({
        message: "Updated successfully"
    });
});




router.get('/bulk', authMiddleware, async (req, res) => {
    const filter = req.query.filter || " ";

    const users = await User.find({
        $or: [
            { firstName: { "$regex": filter, $options: 'i' } },
            { lastName: { "$regex": filter, $options: 'i' } }
        ]
    });

      //  Finds users where firstName or lastName matches the search term using a regular expression.
    // If filter = "an" → It matches Ankur, Sanjay, Anita, Karan


     const userData = users.map(user => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id
    }));

    res.json({
         total: userData.length,
        user: userData
    });
});



export default router;


