
import { Router } from "express";
import userMiddleware from "../middleware/user.js";
import { User, Course, Admin } from "../db/index.js";
const router = Router();

// User Routes
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    await User.create({
        username: username,
        password: password
    })

    res.json({
        message: 'User created successfully'
    })

});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const response = await Course.find({})
        .then(function (response) {
            res.json({
                courses: response,
            })
        })

});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic

    const courseId = req.params.courseId;
    const username = req.headers.username;
    const password = req.headers.password;

    await User.updateOne({
        username: username
    }, {
        "$push": {
            purchasedCourses: courseId
        }
    })
    res.json({
        message: "'Course purchased successfully"
    })

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic

    const user = await User.findOne({
        username: req.headers.username,
    })
    // console.log(user.purchasedCourses);
    const courses = await Course.find({
        _id: {
            $in: user.purchasedCourses
        }
    })
    res.json({
        courses: courses,
    })
});

export default router
