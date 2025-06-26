// backend/db.js
import { connect, Schema, model } from 'mongoose';

connect("mongodb://localhost:27017/paytm")

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 20
    }
});

const accountSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = model('Account', accountSchema);
const User = model('User', userSchema);

export default {
	User,
    Account
};