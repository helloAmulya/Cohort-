
import { connect, Schema, model } from "mongoose"

connect("mongodb+srv://daddyAmulya:daddyAmulya@cluster0.gldtjmy.mongodb.net/nTodo")


const todoSchema = new Schema({
    title: String,
    description: String,
    completed: Boolean,
})
export const Todos = model("Todo", todoSchema);
