// src/components/TaskItem.jsx
import React, { useState, useEffect } from 'react';

function TaskItem({ task, onDelete }) {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        //update the time left until completion
        const updateInterval = setInterval(() => {
            const now = new Date();
            const dueTime = new Date(task.dueDate);
            const difference = dueTime - now;

            if (difference > 0) {
                // milli means 1000, 1000 milliseconds = 1 second
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference / (1000 * 60)) % 60);
                const seconds = Math.floor((difference / 1000) % 60);
                if (days > 0) {
                    setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
                } else {
                    setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
                }
                
            } else {
                clearInterval(updateInterval);
                setTimeLeft('Time\'s up!');
            }
        }, 1000);

        return () => clearInterval(updateInterval);
    }, [task.dueDate]);

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: '10px', border: '1px solid #ccc' }}>
            <div>
                <h4>{task.title}</h4>
                <p>Due in: {timeLeft}</p>
            </div>
            <button onClick={() => onDelete(task.id)} style={{ padding: '5px 10px' }}>Delete</button>
        </div>
    );
}

export default TaskItem;
