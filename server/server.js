const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());


//in memory data storage
let tasks = [
  { id: 1, title: 'Sample Task', category: 'Personal', dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000) } // 1 day from now
];

//endpoint to retrieve tasks
app.get('/api/tasks', (req, res) => {
    setTimeout(() => { // delay
        res.json(tasks);
    }, 1000);
});


//endpoint to create new tasks and add to the task list
app.post('/api/tasks', (req, res) => {
    const task = { ...req.body, id: tasks.length + 1 };
    tasks.push(task);
    res.status(201).json(task);
});

// status 204 means no content
//endpoint to remove task from array

app.delete('/api/tasks/:id', (req, res) => {
    tasks = tasks.filter(task => task.id !== parseInt(req.params.id));
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
