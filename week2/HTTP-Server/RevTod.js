import express from 'express';
import pkg from 'body-parser';
import fs from 'fs/promises';

const { json } = pkg;

const app = express();
const port = 3150;

app.use(json());

// predefine the index functions

function findIndex(arr, index) {
    return arr.findIndex(todo => todo.id === index)
}
function removeIndex(arr, index) {
    return arr.filter((_, i) => i !== index)
    // '_' is the item to delete, and i is the current index
}

app.get('/', (req, res) => {
    res.send('Server is working!');
});

// for reading from the file todos.json
app.get('/todos', async (req, res) => {
    const data = await fs.readFile('todos.json', 'utf-8')
    res.json(JSON.parse(data))
})

app.get('/todos/:id', async (req, res) => {
    const data = await fs.readFile("todos.json", "utf8");
    const todos = JSON.parse(data);
    const index = findIndex(todos, Number(req.params.id));
    if (index === -1) return res.sendStatus(404);
    res.json(todos[index]);
});


app.post('/todos', async (req, res) => {
    const newTodo = {
        id: Math.floor(Math.random() * 1000000),
        title: req.body.title,
        description: req.body.description
    };

    const data = await fs.readFile('todos.json', 'utf-8')
    const todos = JSON.parse(data)
    todos.push(newTodo)
    await fs.writeFile('todos.json', JSON.stringify(todos, null, 2))  // ✅ formatted output
    // the above line rewrites entire todos in the "todos.json" file, takes new todo and with that rewrites
    res.status(201).json(newTodo)
})

app.put('/todos/:id', async (req, res) => {

    // in this, first we read all the todos, then after taking the index we update the todo

    const data = await fs.readFile('todos.json', 'utf-8')
    const todos = JSON.parse(data)
    const index = findIndex(todos, Number(req.params.id))
    if (index === -1) return res.sendStatus(404);

    const updatedTodo = {
        id: todos[index].id, // same id as of that todo
        title: req.body.title,
        description: req.body.description
    };

    // todos.push(updatedTodo) // this will not work as this is for adding a new todo , but we want to update the existing todo
    // therefore ->
    todos[index] = updatedTodo
    await fs.writeFile('todos.json', JSON.stringify(todos, null, 2))  // ✅ formatted output
    res.status(200).json(updatedTodo)
})

app.delete('/todos/:id', async (req, res) => {

    const data = await fs.readFile('todos.json', 'utf-8')
    const todos = JSON.parse(data)
    const index = findIndex(todos, Number(req.params.id))
    if (index === -1) return res.sendStatus(404);

    const updated = removeIndex(todos, index)
    await fs.writeFile('todos.json', JSON.stringify(updated, null, 2))  // ✅ formatted output
    res.status(200).json({ message: 'Todo deleted successfully' });
})

app.listen(port, () => {
    console.log(`Server is runnning at http://localhost:${port}`)
})
