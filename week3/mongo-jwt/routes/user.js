
import { Router } from "express";
import userMiddleware from "../middleware/user.js";
import { Course, User } from "../db/index.js"; // Corrected import
import { JWT_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

const router = Router();

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
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
        res.status(500).json({ message: 'Error creating user', error: error.message }); //Added error message
    }
});

router.post('/signin', async (req, res) => {
    // Implement user signin logic
    const username = req.body.username;
    const password = req.body.password;
    // console.log(JWT_SECRET);

    try {
        const user = await User.findOne({  
            username: username, 
            password: password,
        });

        if (user) {
            const token = jwt.sign({ username: username }, JWT_SECRET); 
            res.json({ token: token }); 
        } else {
            res.status(401).json({ message: "Incorrect username or password" }); 
        }
    } catch (error) {
        console.error("Error during signin:", error);
        res.status(500).json({ message: 'Error signing in', error: error.message });
    }
});

router.get('/courses', async (req, res) => {
    // implement listing all courses logic
    try {
        const courses = await Course.find({}); 
        res.json({ courses: courses });

    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ message: 'Error fetching courses', error: error.message });
    }

});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.username; 


    try {
        const user = await User.findOneAndUpdate( 
            { username: username },
            { $push: { purchasedCourses: courseId } },
            { new: true } // return updated document
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "Course purchased successfully" });
    } catch (error) {
        console.error("Error purchasing course:", error);
        res.status(500).json({ message: 'Error purchasing course', error: error.message });
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.username; 

    try {
        const user = await User.findOne({ username: username }).populate('purchasedCourses'); 
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ courses: user.purchasedCourses });
    } catch (error) {
        console.error("Error fetching purchased courses:", error);
        res.status(500).json({ message: 'Error fetching purchased courses', error: error.message });
    }
});

export default router;
