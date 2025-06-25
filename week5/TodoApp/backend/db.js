import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

import { connect, Schema, model } from "mongoose"


mongoose.connect( `${process.env.MONGO_URI}${process.env.MONGO_DB_NTODO}`)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(" MongoDB connection error:", err));



const todoSchema = new Schema({
    title: String,
    description: String,
    completed: Boolean,
})
export const Todos = model("Todo", todoSchema);
