import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

import { model, Schema, connect } from 'mongoose';

mongoose.connect( `${process.env.MONGO_URI}${process.env.MONGO_DB_MONGO_REV}`)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(" MongoDB connection error:", err));


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

