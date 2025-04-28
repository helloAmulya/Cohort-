import adminMiddleware from "../middleware/adminM.js";
import { Admin, Course } from "../db/index.js"
import { JWT_SECRET } from "../config.js"
import { Router } from "express";
import pkg from 'jsonwebtoken';
const { sign } = pkg;
const router = Router();

router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    await Admin.create({
        username,
        password,
    })

    res.json({
        message: "Admin creaed successfully"
    })
})


router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await Admin.findOne({
        username,
        password,
    })
    if (user) {
        const token = sign({ username }, JWT_SECRET)
        res.json({
            message: "Login successful",
            token: token
        })
    }
    else {
        res.status(411).json({
            messaage: "Invalid Credentials"
        })
    }
})



router.post('/add-course', adminMiddleware, async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price,
    })

    res.json({
        message: "Course added successfully", courseId: newCourse._id
    })
})

router.get('/list-courses', adminMiddleware, async (req, res) => {
    const allCourse = await Course.find({})
    res.json({
        courses: allCourse
    })
})

export default router;