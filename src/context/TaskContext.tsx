"use client";

import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { TaskService } from "@/services/taskService";
import type { CreateTaskInput, Task, UpdateTaskInput } from "@/types/task";

interface TaskContextType {
	tasks: Task[];
	loading: boolean;
	error: string | null;
	createTask: (taskData: CreateTaskInput) => Promise<Task>;
	updateTask: (taskData: UpdateTaskInput) => Promise<Task | null>;
	deleteTask: (id: string) => Promise<boolean>;
	toggleTaskCompletion: (id: string) => Promise<Task | null>;
	getTaskById: (id: string) => Task | undefined;
	taskStats: {
		total: number;
		completed: number;
	};
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				setLoading(true);
				const data = await TaskService.getTasks();
				setTasks(data);
				setError(null);
			} catch (err) {
				setError("Failed to fetch tasks");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchTasks();
	}, []);

	const createTask = async (taskData: CreateTaskInput): Promise<Task> => {
		try {
			console.debug("TaskContext.createTask called", taskData);
			const newTask = await TaskService.createTask(taskData);
			setTasks((prev) => [...prev, newTask]);
			return newTask;
		} catch (err) {
			setError("Failed to create task");
			console.error(err);
			throw err;
		}
	};

	const updateTask = async (
		taskData: UpdateTaskInput,
	): Promise<Task | null> => {
		try {
			console.debug("TaskContext.updateTask called", taskData);
			const updatedTask = await TaskService.updateTask(taskData);
			if (updatedTask) {
				setTasks((prev) =>
					prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
				);
			}
			return updatedTask;
		} catch (err) {
			setError("Failed to update task");
			console.error(err);
			throw err;
		}
	};

	const deleteTask = async (id: string): Promise<boolean> => {
		try {
			const success = await TaskService.deleteTask(id);
			if (success) {
				setTasks((prev) => prev.filter((task) => task.id !== id));
			}
			return success;
		} catch (err) {
			setError("Failed to delete task");
			console.error(err);
			throw err;
		}
	};

	const toggleTaskCompletion = async (id: string): Promise<Task | null> => {
		try {
			const updatedTask = await TaskService.toggleTaskCompletion(id);
			if (updatedTask) {
				setTasks((prev) =>
					prev.map((task) => (task.id === id ? updatedTask : task)),
				);
			}
			return updatedTask;
		} catch (err) {
			setError("Failed to toggle task completion");
			console.error(err);
			throw err;
		}
	};

	const getTaskById = (id: string): Task | undefined => {
		return tasks.find((task) => task.id === id);
	};

	// Calculate task statistics
	const taskStats = {
		total: tasks.length,
		completed: tasks.filter((task) => task.completed).length,
	};

	return (
		<TaskContext.Provider
			value={{
				tasks,
				loading,
				error,
				createTask,
				updateTask,
				deleteTask,
				toggleTaskCompletion,
				getTaskById,
				taskStats,
			}}
		>
			{children}
		</TaskContext.Provider>
	);
}

export function useTaskContext() {
	const context = useContext(TaskContext);
	if (context === undefined) {
		throw new Error("useTaskContext must be used within a TaskProvider");
	}
	return context;
}
