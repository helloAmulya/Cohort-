import { model, Schema, connect } from 'mongoose';

connect("mongodb+srv://daddyAmulya:daddyAmulya@cluster0.gldtjmy.mongodb.net/mongoRev")

const AdminSchema = new Schema({
    username: String,
    password: String,
})
const UserSchema = new Schema({
    username: String,
    password: String,
    purchasedCourses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }],
})
const CourseSchema = new Schema({
    title: String,
    description: String,
    imageLink: String,
    price: Number,
})

export const Admin = model('Admin', AdminSchema)
export const User = model('User', UserSchema)
export const Course = model('Course', CourseSchema)

