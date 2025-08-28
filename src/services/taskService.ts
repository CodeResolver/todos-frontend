import type { CreateTaskInput, Task, UpdateTaskInput } from "../types/task";

// Backend API configuration
// If NEXT_PUBLIC_API_URL is provided, use it (for when an external backend runs on another port).
// Otherwise, default to the internal Next.js API routes under `/api` so the frontend works without an external backend.
const EXTERNAL_API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

const buildUrl = (path: string) => {
	// If an external base is set, call that (e.g. http://localhost:3001/tasks)
	if (EXTERNAL_API_BASE)
		return `${EXTERNAL_API_BASE.replace(/\/$/, "")}${path}`;
	// Otherwise, call the Next.js internal API route (same origin)
	return `/api${path}`;
};

// Helper function to transform backend task to frontend task
const transformTask = (backendTask: {
	id: number;
	title: string;
	color?:
		| "red"
		| "blue"
		| "green"
		| "purple"
		| "yellow"
		| "orange"
		| "pink"
		| "gray";
	completed: boolean;
	createdAt: string;
	updatedAt: string;
}): Task => ({
	id: backendTask.id.toString(),
	title: backendTask.title,
	color: backendTask.color,
	completed: backendTask.completed,
	createdAt: new Date(backendTask.createdAt),
	updatedAt: new Date(backendTask.updatedAt),
});

// API service connected to Express backend
export const TaskService = {
	// Get all tasks
	getTasks: async (): Promise<Task[]> => {
		try {
			const response = await fetch(buildUrl("/tasks"));
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const result = await response.json();
			return result.data.map(transformTask);
		} catch (error) {
			console.error("Failed to fetch tasks:", error);
			throw error;
		}
	},

	// Get a single task by ID
	getTaskById: async (id: string): Promise<Task | null> => {
		try {
			const response = await fetch(buildUrl(`/tasks/${id}`));
			if (!response.ok) {
				if (response.status === 404) return null;
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const result = await response.json();
			return transformTask(result.data);
		} catch (error) {
			console.error("Failed to fetch task:", error);
			throw error;
		}
	},

	// Create a new task
	createTask: async (taskData: CreateTaskInput): Promise<Task> => {
		try {
			console.debug("TaskService.createTask", taskData);
			const response = await fetch(buildUrl("/tasks"), {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(taskData),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(
					errorData.error?.message || `HTTP error! status: ${response.status}`,
				);
			}

			const result = await response.json();
			return transformTask(result.data);
		} catch (error) {
			console.error("Failed to create task:", error);
			throw error;
		}
	},

	// Update an existing task
	updateTask: async (taskData: UpdateTaskInput): Promise<Task | null> => {
		try {
			console.debug("TaskService.updateTask", taskData);
			const { id, ...updateData } = taskData;

			const response = await fetch(buildUrl(`/tasks/${id}`), {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updateData),
			});

			if (!response.ok) {
				if (response.status === 404) return null;
				const errorData = await response.json();
				throw new Error(
					errorData.error?.message || `HTTP error! status: ${response.status}`,
				);
			}

			const result = await response.json();
			return transformTask(result.data);
		} catch (error) {
			console.error("Failed to update task:", error);
			throw error;
		}
	},

	// Delete a task
	deleteTask: async (id: string): Promise<boolean> => {
		try {
			console.debug("TaskService.deleteTask", id);
			const response = await fetch(buildUrl(`/tasks/${id}`), {
				method: "DELETE",
			});

			if (!response.ok) {
				if (response.status === 404) return false;
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			return true;
		} catch (error) {
			console.error("Failed to delete task:", error);
			throw error;
		}
	},

	// Toggle task completion status
	toggleTaskCompletion: async (id: string): Promise<Task | null> => {
		try {
			console.debug("TaskService.toggleTaskCompletion", id);

			// First get the current task
			const currentTask = await TaskService.getTaskById(id);
			if (!currentTask) return null;

			// Update with toggled completion status
			return await TaskService.updateTask({
				id,
				completed: !currentTask.completed,
			});
		} catch (error) {
			console.error("Failed to toggle task completion:", error);
			throw error;
		}
	},
};
