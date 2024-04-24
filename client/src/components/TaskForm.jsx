// src/components/TaskForm.jsx
import React, { useState } from 'react';

function TaskForm({ onAddTask }) {
    const [title, setTitle] = useState('');
    const [dueIn, setDueIn] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        const dueDate = new Date(Date.now() + dueIn * 60 * 60 * 1000);
        onAddTask({ title, dueDate });
        setTitle('');
        setDueIn('');
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', margin: '20px', alignItems: 'flex-start' }}>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Task Title" style={{ marginBottom: '10px', padding: '8px', width: '200px' }} />
            <input type="number" value={dueIn} onChange={e => setDueIn(e.target.value)} placeholder="Due in hours" style={{ marginBottom: '10px', padding: '8px', width: '200px' }} />
            <button type="submit" style={{ padding: '8px 20px' }}>Add Task</button>
        </form>
    );
}

export default TaskForm;
