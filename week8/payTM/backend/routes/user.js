import express from "express";
import { z } from 'zod'
import { User, Account } from "../db.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";

import authMiddleware from '../middleware/auth.js';

import JWT_SECRET from "../config/jwtConfig.js";

const router = express.Router();

/*
    Docs: (u can update this if u want)

    1. the user.js handles the user data and its routes
    - user creation, authentication, updation etc

    2. there are different schemas to facilitate flow of data , we use zod for validation of these
    
    3. for any route (taking signup as example), we pass the data in the body, safeParse that (because of zod),
    - then we destructure the data ->  const {email,password, username , etc...} = result.data -> this is done to obtain each data
    - we check for the user/data that if it is already present or not
    - if not we create, before that we hash the password using the bcrypt and add salt  to it for difference in hashing when we store similar pass/data
    - we then create the user , and we pass the hashed password instead the old/original password 
    - assign a id to the created user ( ._id  in case of mongodb)
    - side by side the account is also created to store the balance of the user passing the same userId assigned at the time of user creation 
    
    4. now generate a jwt token with the JWT_SECRET (a hardcoded secure password), which can be used to verification 
    
    5. do same for signin, pass the username/email in the body (we used to signup)
    - look for user, if found proceed. 
    - now for verification, we use bcrypt compare, we hash the given pass with the same salt and the rules that we used in the signup
    - this doesnot mean -> bcrypt.hash(password-we-gave-now) = storedPassword
    - this means password-we-gave-now will be hashed with the same salt and rules previously used then compare -> (new-hashed-pass) = storedPass
    - jwt verify with the userId, JWT_SECRET, and give token. 
    - these tokens can be stored (localStorage) to accesss protected routes

    6. update is simple, new schema, get data, match based on passed userId
    - update using ->  await User.updateOne(
        { _id: req.userId },
        { $set: result.data }
    );


    7. now if we want to find users based on their username or else, can be an admin task 
    - this is where we will take in account for the stored jwt tokens and the authMiddleware
    -  $or: [
            { firstName: { "$regex": filter, $options: 'i' } },
            { lastName: { "$regex": filter, $options: 'i' } }
        ]
            this to find (a type of filtering ,based on query passed in the url
            example : http://localhost:3000/api/v1/user/bulk?filter=ra    | this will search for all username having r & a
*/


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


