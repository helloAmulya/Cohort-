
import dotenv from 'dotenv';

// dotenv.config();
// always check for this path , this will be the issue if the env is global (for any case) 
dotenv.config({ path: '../.env' });



import mongoose, { Schema, model } from 'mongoose';



// connect("mongodb://localhost:27017/paytm")

const mongoURI = `${process.env.MONGO_URI}${process.env.MONGO_DB_PAYTM}`;

// mongoose.connect(`${process.env.MONGO_URI}${process.env.MONGO_DB_PAYTM}`)
//     .then(() => console.log("Connected to MongoDB"))
//     .catch((err) => console.error(" MongoDB connection error:", err));


mongoose.connect(mongoURI)
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => {
    console.error(" DB connection failed:", err);
    process.exit(1); 
  });

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
        type: Schema.Types.ObjectId,
        ref: 'User',    // Reference to User model
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

export const User = model('User', userSchema);
export const Account = model('Account', accountSchema);

// export default {
//     User,
//     Account
// };