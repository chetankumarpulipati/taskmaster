import React from 'react';
import { Task as TaskType } from '../db';

interface TaskProps {
    task: TaskType;
    onTaskUpdate: (updatedTask: TaskType) => void;
    onTaskDelete: (taskId: number) => void;
}

const Task: React.FC<TaskProps> = ({ task, onTaskUpdate, onTaskDelete }) => {
    const handleCheckboxChange = () => {
        onTaskUpdate({ ...task, completed: !task.completed });
    };

    const handleDeleteClick = () => {
        onTaskDelete(task.id);
    };

    return (
        <li>
            <input type="checkbox" checked={task.completed} onChange={handleCheckboxChange} />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.text}
      </span>
            <button onClick={handleDeleteClick}>Delete</button>
        </li>
    );
};

export default Task;