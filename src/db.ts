import { openDB } from 'idb';

export type Priority = 'low' | 'medium' | 'high';
export type Category = 'work' | 'personal' | 'shopping' | 'health' | 'education' | 'other';

export interface Task {
    id: number;
    text: string;
    description?: string;
    completed: boolean;
    priority: Priority;
    category: Category;
    dueDate?: string;
    createdAt: string;
    updatedAt: string;
    tags: string[];
}

const DB_NAME = 'taskmaster-db';
const TASK_STORE = 'tasks';

const dbPromise = openDB(DB_NAME, 2, {
    upgrade(db, oldVersion) {
        if (!db.objectStoreNames.contains(TASK_STORE)) {
            const store = db.createObjectStore(TASK_STORE, { keyPath: 'id', autoIncrement: true });
            // Create indexes for better querying
            store.createIndex('priority', 'priority');
            store.createIndex('category', 'category');
            store.createIndex('completed', 'completed');
            store.createIndex('dueDate', 'dueDate');
        } else if (oldVersion < 2) {
            // Migration for existing data - handle index creation more safely
            try {
                const tx = db.transaction(TASK_STORE, 'readwrite');
                const store = tx.objectStore(TASK_STORE);

                // Check and create indexes one by one with proper error handling
                try {
                    if (!(store as any).indexNames.contains('priority')) {
                        (store as any).createIndex('priority', 'priority');
                    }
                } catch (e) {
                    console.warn('Failed to create priority index:', e);
                }

                try {
                    if (!(store as any).indexNames.contains('category')) {
                        (store as any).createIndex('category', 'category');
                    }
                } catch (e) {
                    console.warn('Failed to create category index:', e);
                }

                try {
                    if (!(store as any).indexNames.contains('completed')) {
                        (store as any).createIndex('completed', 'completed');
                    }
                } catch (e) {
                    console.warn('Failed to create completed index:', e);
                }

                try {
                    if (!(store as any).indexNames.contains('dueDate')) {
                        (store as any).createIndex('dueDate', 'dueDate');
                    }
                } catch (e) {
                    console.warn('Failed to create dueDate index:', e);
                }
            } catch (e) {
                console.warn('Failed to perform database migration:', e);
            }
        }
    },
});

export const getTasks = async (): Promise<Task[]> => {
    const db = await dbPromise;
    return db.getAll(TASK_STORE);
};

export const getTasksByCategory = async (category: Category): Promise<Task[]> => {
    const db = await dbPromise;
    return db.getAllFromIndex(TASK_STORE, 'category', category);
};

export const getTasksByPriority = async (priority: Priority): Promise<Task[]> => {
    const db = await dbPromise;
    return db.getAllFromIndex(TASK_STORE, 'priority', priority);
};

export const getCompletedTasks = async (): Promise<Task[]> => {
    const db = await dbPromise;
    return db.getAllFromIndex(TASK_STORE, 'completed', 1 as any);
};

export const getPendingTasks = async (): Promise<Task[]> => {
    const db = await dbPromise;
    return db.getAllFromIndex(TASK_STORE, 'completed', 0 as any);
};

export const addTask = async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<number> => {
    const db = await dbPromise;
    const now = new Date().toISOString();
    const newTask = {
        ...task,
        createdAt: now,
        updatedAt: now,
    } as Task;
    return db.add(TASK_STORE, newTask) as Promise<number>;
};

export const updateTask = async (task: Task): Promise<void> => {
    const db = await dbPromise;
    const updatedTask = {
        ...task,
        updatedAt: new Date().toISOString(),
    };
    await db.put(TASK_STORE, updatedTask);
};

export const deleteTask = async (taskId: number): Promise<void> => {
    const db = await dbPromise;
    await db.delete(TASK_STORE, taskId);
};

export const getTaskStats = async () => {
    const tasks = await getTasks();
    const completed = tasks.filter(task => task.completed).length;
    const pending = tasks.length - completed;
    const overdue = tasks.filter(task =>
        task.dueDate && new Date(task.dueDate) < new Date() && !task.completed
    ).length;

    const priorityStats = {
        high: tasks.filter(task => task.priority === 'high' && !task.completed).length,
        medium: tasks.filter(task => task.priority === 'medium' && !task.completed).length,
        low: tasks.filter(task => task.priority === 'low' && !task.completed).length,
    };

    const categoryStats = tasks.reduce((acc, task) => {
        acc[task.category] = (acc[task.category] || 0) + (task.completed ? 0 : 1);
        return acc;
    }, {} as Record<Category, number>);

    return {
        total: tasks.length,
        completed,
        pending,
        overdue,
        priorityStats,
        categoryStats,
    };
};
