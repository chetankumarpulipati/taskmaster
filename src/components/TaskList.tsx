// src/components/TaskList.tsx
import React, { useState, useEffect } from 'react';
import TaskComponent from './Task';
import { getTasks, addTask, updateTask, deleteTask } from '../db';

interface Task {
    id: number;
    text: string;
    completed: boolean;
}

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTaskText, setNewTaskText] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            const storedTasks = await getTasks();
            setTasks(storedTasks);
        };
        fetchTasks();
    }, []);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTaskText(event.target.value);
    };

    const handleAddTask = async () => {
        if (newTaskText.trim() !== '') {
            const newTask: Omit<Task, 'id'> = {
                text: newTaskText,
                completed: false,
            };

            const id = await addTask(newTask);
            setTasks([...tasks, { ...newTask, id }]);
            setNewTaskText('');
        }
    };

    const handleTaskUpdate = async (updatedTask: Task) => {
        setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
        await updateTask(updatedTask);
    };

    const handleTaskDelete = async (taskId: number) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
        await deleteTask(taskId);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="e.g., Attend meeting at 2 pm"
                value={newTaskText}
                onChange={handleInputChange}
            />
            <div className="add-task-container">
                <button onClick={handleAddTask}>Add Task</button>
            </div>
            <ul>
                {tasks.map((task) => (
                    <TaskComponent
                        key={task.id}
                        task={task}
                        onTaskUpdate={handleTaskUpdate}
                        onTaskDelete={handleTaskDelete}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;