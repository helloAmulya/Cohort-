import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/paytm')

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
})

const User = mongoose.model('User',userSchema)

export default User;