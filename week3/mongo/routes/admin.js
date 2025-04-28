import { Router } from "express";
import adminMiddleware from "../middleware/admin.js";
import { Admin, Course } from "../db/index.js";;
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

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course posting logic
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
        message: 'course ddded successfully',
        courseId: newCourse._id,
    })

});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const respons = await Course.find({})
        .then(function (response) {
            res.json({
                courses: response,
            })
        })
});

export default router;