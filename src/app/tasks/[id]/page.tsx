"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TaskForm } from "@/components/TaskForm";
import { useTaskContext } from "@/context/TaskContext";
import { TaskService } from "@/services/taskService";
import type { Task } from "@/types/task";

export default function EditTaskPage() {
	const params = useParams();
	const router = useRouter();
	const { getTaskById, loading: contextLoading } = useTaskContext();
	const [task, setTask] = useState<Task | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchTask = async () => {
			if (!params.id) {
				setError("Task ID is missing");
				setLoading(false);
				return;
			}

			const taskId = Array.isArray(params.id) ? params.id[0] : params.id;

			try {
				// First try to get from context (if tasks are already loaded)
				const contextTask = getTaskById(taskId);
				if (contextTask) {
					setTask(contextTask);
					setLoading(false);
					return;
				}

				// If not in context or context is still loading, fetch directly from API
				if (!contextLoading) {
					const fetchedTask = await TaskService.getTaskById(taskId);
					if (fetchedTask) {
						setTask(fetchedTask);
					} else {
						setError("Task not found");
					}
				}
			} catch (err) {
				console.error("Error fetching task:", err);
				setError("Failed to load task");
			} finally {
				setLoading(false);
			}
		};

		fetchTask();
	}, [params.id, getTaskById, contextLoading]);

	if (loading) {
		return (
			<div className="w-full flex justify-center items-center min-h-[60vh]">
				<div className="animate-pulse text-gray-300 text-lg">
					Loading task...
				</div>
			</div>
		);
	}

	if (error || !task) {
		return (
			<div className="w-full flex flex-col items-center min-h-[60vh] gap-4">
				<div className="text-danger text-xl font-bold">
					{error || "Failed to load task"}
				</div>
				<button
					onClick={() => router.push("/")}
					className="btn-primary px-6 py-3"
				>
					Back to tasks
				</button>
			</div>
		);
	}

	return (
		<div className="w-full flex justify-center pb-16">
			<TaskForm task={task} isEditing />
		</div>
	);
}
