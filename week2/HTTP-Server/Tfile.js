import express from 'express';
// import { json } from 'body-parser';
import fs from 'fs/promises';
import pkg from 'body-parser';
const { json } = pkg;

const app = express();
const port = 2000;

app.use(json());

function findIndex(arr, id) {
    return arr.findIndex(todo => todo.id === id);
}

function removeAtIndex(arr, index) {
    return arr.filter((_, i) => i !== index);
}

app.get('/', (req, res) => {
    res.send('Server is working!');
});

app.get('/todos', async (req, res) => {
    const data = await fs.readFile("todos.json", "utf8");
    res.json(JSON.parse(data));
});

app.get('/todos/:id', async (req, res) => {
    const data = await fs.readFile("todos.json", "utf8");
    const todos = JSON.parse(data);
    const index = findIndex(todos, parseInt(req.params.id));
    if (index === -1) return res.status(404).send();
    res.json(todos[index]);
});

app.post('/todos', async (req, res) => {
    const newTodo = {
        id: Math.floor(Math.random() * 1000000),
        title: req.body.title,
        description: req.body.description
    };
    const data = await fs.readFile("todos.json", "utf8");
    const todos = JSON.parse(data);
    todos.push(newTodo);
    await fs.writeFile("todos.json", JSON.stringify(todos));
    res.status(201).json(newTodo);
});

app.put('/todos/:id', async (req, res) => {
    const data = await fs.readFile("todos.json", "utf8");
    const todos = JSON.parse(data);
    const index = findIndex(todos, parseInt(req.params.id));
    if (index === -1) return res.status(404).send();
    const updated = {
        id: todos[index].id,
        title: req.body.title,
        description: req.body.description
    };
    todos[index] = updated;
    await fs.writeFile("todos.json", JSON.stringify(todos));
    res.status(200).json(updated);
});

app.delete('/todos/:id', async (req, res) => {
    const data = await fs.readFile("todos.json", "utf8");
    const todos = JSON.parse(data);
    const index = findIndex(todos, parseInt(req.params.id));
    if (index === -1) return res.status(404).send();
    const updated = removeAtIndex(todos, index);
    await fs.writeFile("todos.json", JSON.stringify(updated));
    res.status(200).send();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
