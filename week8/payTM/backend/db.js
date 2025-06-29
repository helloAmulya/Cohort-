
import dotenv from 'dotenv';

// dotenv.config();
// always check for this path , this will be the issue if the env is global (for any case) 
dotenv.config({ path: '../.env' });

/*
     - setup the database schema for the user-data and account-data, 
     - used dynamic mongodb connection using the environment variables (good practice)
     - imp -> keep in mind when importing the variables from the env about the env location/path like: dotenv.config({ path: '../.env' });
     - in the schema predefine the structure of data like:  username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    }
        - this way it will be more secure and later use zod for more schema validation
        - export the schemas separately if causes any issue in importing 

*/

import mongoose, { Schema, model } from 'mongoose';


const mongoURI = `${process.env.MONGO_URI}${process.env.MONGO_DB_PAYTM}`;



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
        ref: 'User',    // Reference to User model, so that we can have which user has what balance 
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