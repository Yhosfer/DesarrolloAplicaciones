const express = require('express');
const app = express();

app.use(express.json());

// Base de datos en memoria
let tasks = [
    { id: 1, title: 'Estudiar Node', done: false },
    { id: 2, title: 'Leer guía de prácticas', done: false }
];
let nextId = 3;

// Endpoint estado de la API
app.get('/status', (req, res) => {
    res.json({ status: 'yeah', message: 'API CRUD funca' });
});

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// POST (crea una nueva tarea)
app.post('/tasks', (req, res) => {
    const { title, done } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'El campo title es obligatorio' });
    }

    const newTask = {
        id: nextId++,
        title,
        done: done === true
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

// PUT (actualiza una tarea)
app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, done } = req.body;

    const task = tasks.find(t => t.id === id);
    if (!task) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    if (title !== undefined) task.title = title;
    if (done !== undefined) task.done = done;

    res.json(task);
});

// DELETE (elimina una tarea)
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    const deleted = tasks.splice(index, 1)[0];
    res.json({ message: 'Tarea eliminada', deleted });
});

// Levantar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Ejercicio 1 corriendo en http://localhost:${PORT}`);
});