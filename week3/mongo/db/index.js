
import { connect, Schema, model } from 'mongoose';

// Connect to MongoDB
connect('mongodb+srv://daddyAmulya:daddyAmulya@cluster0.gldtjmy.mongodb.net/course_app');

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

