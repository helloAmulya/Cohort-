import userMiddleware from "../middleware/userM.js";
import { User, Course } from "../db/index.js"
import { JWT_SECRET } from "../config.js"
import { Router } from "express";
import pkg from 'jsonwebtoken';
const { sign } = pkg;

const router = Router();

router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        await User.create({
            username: username,
            password: password,
        });
        res.json({ message: 'User created successfully' });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
})


router.post('/login', async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const user = await User.findOne({
            username,
            password,
        });

        if (user) {
            const token = sign({ username }, JWT_SECRET);
            res.json({
                message: "Login successful",
                token: token
            });
        } else {
            res.status(411).json({
                message: "Invalid Credentials"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Something went wrong. Please try again later."
        });
    }
});


router.post('/purchase-course/:courseId', userMiddleware, async (req, res) => {

    const courseId = req.params.courseId;
    const username = req.username;

    try {
        const user = await User.findOneAndUpdate(
            { username: username },
            // { $push: { purchasedCourses: courseId } },
            
            // $addToSet prevents duplication of the course
            {$addToSet : {purchasedCourses: courseId}},
            { new: true },
        )

        if (!user) {
            res.status(404).json({
                message: "user not found",
            })
        }
        res.json({
            message: "Course purchased successfully",
        })

    } catch (error) {
        console.error("Error purchasing course:", error);
        res.status(500).json({ message: 'Error purchasing course', error: error.message });
    }

})

router.get('/course/purchased', userMiddleware, async (req, res) => {
    const username = req.username;

    try {
        const user = await User.findOne({ username: username }).populate('purchasedCourses');
        
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.json({ courses: user.purchasedCourses });

    } catch (error) {
        console.error("Error fetching purchased courses:", error);
        res.status(500).json({ message: 'Error fetching purchased courses', error: error.message });
    }
});


export default router;