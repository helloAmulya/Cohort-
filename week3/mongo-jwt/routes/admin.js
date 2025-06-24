import { Router } from "express";
import adminMiddleware from "../middleware/admin.js";
import { Admin, User, Course } from "../db/index.js";
import { JWT_SECRET } from "../config.js";

import pkg from 'jsonwebtoken';
const { verify, sign } = pkg;

const router = Router();

// Admin Routes 
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    // check if a user with this username already exists
    await Admin.create({
        username: username,
        password: password
    })

    res.json({
        message: 'Admin created successfully'
    })
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    // console.log(JWT_SECRET);

    const user = await Admin.findOne({
        username,
        password
    })
    if (user) {
        // here i am using the jwt.sign method to create a token and send it back
        const token = sign({ username }, JWT_SECRET);

        res.json({ token })
    } else {
        res.status(411).json({
            message: "Incorrect email and pass"
        })
    }
});


router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;
    // zod
    const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price
    })

    res.json({
        message: 'Course created successfully', courseId: newCourse._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const response = await Course.find({});

    res.json({
        courses: response
    })

});


export default router;