import { openDB, DBSchema } from 'idb';

export interface Task {
    id: number;
    text: string;
    completed: boolean;
}

interface TaskDB extends DBSchema {
    tasks: {
        key: number;
        value: Task;
    };
}

const DB_NAME = 'taskmaster-db';
const TASK_STORE = 'tasks';

const dbPromise = openDB<TaskDB>(DB_NAME, 1, {
    upgrade(db) {
        if (!db.objectStoreNames.contains(TASK_STORE)) {
            db.createObjectStore(TASK_STORE, { keyPath: 'id', autoIncrement: true });
        }
    },
});

export const getTasks = async (): Promise<Task[]> => {
    const db = await dbPromise;
    return db.getAll(TASK_STORE);
};

export const addTask = async (task: Omit<Task, 'id'>): Promise<number> => {
    const db = await dbPromise;
    return db.add(TASK_STORE, task as Task);
};


export const updateTask = async (task: Task): Promise<void> => {
    const db = await dbPromise;
    await db.put(TASK_STORE, task);
};

export const deleteTask = async (taskId: number): Promise<void> => {
    const db = await dbPromise;
    await db.delete(TASK_STORE, taskId);
};