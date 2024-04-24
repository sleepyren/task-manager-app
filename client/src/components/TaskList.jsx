// src/components/TaskList.jsx
import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onDelete }) {
    return (
        <div className="task-list" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            {tasks.map(task => (
                <TaskItem key={task.id} task={task} onDelete={onDelete} />
            ))}
        </div>
    );
}

export default TaskList;
