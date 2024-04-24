import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
    const [tasks, setTasks] = useState([]);

    //API call is made ONLY ONCE since the dependency array is empty
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await fetch('http://localhost:3001/api/tasks');
        const data = await response.json();
        setTasks(data);
    };

    //using a POST request add a task to the list 
    const addTask = async (task) => {
        const response = await fetch('http://localhost:3001/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });
        const newTask = await response.json();
        setTasks([...tasks, newTask]);
    };

    //this function can be passed to the lower components as props so that
    //the structure can be edited
    const deleteTask = async (id) => {
        await fetch(`http://localhost:3001/api/tasks/${id}`, {
            method: 'DELETE'
        });
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Task Manager</h1>
            <TaskForm onAddTask={addTask} />
            <TaskList tasks={tasks} onDelete={deleteTask} />
        </div>
    );
}

export default App;
