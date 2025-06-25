
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

import { connect, Schema, model } from 'mongoose';


// connecting with mongoDB
mongoose.connect( `${process.env.MONGO_URI}${process.env.MONGO_DB_COURSE_V2}`)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(" MongoDB connection error:", err));



// Define schemas
const AdminSchema = new Schema({
    // Schema definition here
    username: String,
    password: String

});
const UserSchema = new Schema({
    // Schema definition here
    username: String,
    password: String,
    purchasedCourses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

const CourseSchema = new Schema({
    // Schema definition here
    title: String,
    description: String,
    imageLink: String,
    price: Number
});

// const Admin = model('Admin', AdminSchema);
// const User = model('User', UserSchema);
// const Course = model('Course', CourseSchema);

// export default {
//     Admin,
//     User,
//     Course
// }

export const Admin = model('Admin', AdminSchema);
export const User = model('User', UserSchema);
export const Course = model('Course', CourseSchema);

