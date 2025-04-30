import express from 'express';
import { createTodo, updateTodo } from "./types.js";
import cors from "cors";
import { Todos } from "./db.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use(cors())

app.post('/todos', async function (req, res) {

    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if (!parsedPayload.success) {
        res.status(411).json({
            message: "You sent the wrong input"
        })
        return;
    }

    await Todos.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false,
    })

    res.json({
        msg: "Todo created"
    })


});

app.get('/todos', async function (req, res) {

    const getAll = await Todos.find({})
    console.log("Todos fetched successfully")
    res.json({
        todos: getAll
        // todos: [getAll]
    })

});


app.put('/completed', async function (req, res) {

    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload)
    if (!parsedPayload.success) {
        res.status(411).json({
            message: "You sent the wrong input"
        })
        return;
    }

    await Todos.updateOne({
        _id: req.body.id,
    }, {
        completed: true
    })

    res.json({
        msg: "Todo updated"
    })

});

// made this myself

app.delete("/todos/:id", async function (req, res) {
    await Todos.deleteOne({
        _id: req.params.id
    })
    res.json({
        msg: "Todo deleted",
    })
})



app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});



