"use client";

import Link from "next/link";
import type React from "react";
import { useState } from "react";
import { Checkbox } from "@/components/Checkbox";
import { useTaskContext } from "@/context/TaskContext";
import type { Task } from "@/types/task";
import { APP_COLORS } from "@/utils/colors";

interface TaskCardProps {
	task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
	const { toggleTaskCompletion, deleteTask } = useTaskContext();
	const [isDeleting, setIsDeleting] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);

	const handleDeleteClick = (e: React.MouseEvent) => {
		e.preventDefault(); // Prevent navigation
		setShowConfirm(true);
	};

	const handleConfirmDelete = async (e: React.MouseEvent) => {
		e.preventDefault(); // Prevent navigation
		setIsDeleting(true);
		try {
			if (task.id == null) {
				console.error("Cannot delete task: missing id");
				return;
			}
			await deleteTask(String(task.id));
		} catch (error) {
			console.error("Error deleting task:", error);
		} finally {
			setIsDeleting(false);
			setShowConfirm(false);
		}
	};

	const handleCancelDelete = (e: React.MouseEvent) => {
		e.preventDefault(); // Prevent navigation
		setShowConfirm(false);
	};

	return (
		<Link href={`/tasks/${task.id}`}>
			<div
				className="relative flex items-center gap-3 p-4 mb-3 rounded-lg transition-colors"
				style={{
					backgroundColor: "#262626",
					borderWidth: "1px",
					borderStyle: "solid",
					borderTopColor: task.completed ? "#262626" : "#333333",
					borderRightColor: task.completed ? "#262626" : "#333333",
					borderBottomColor: task.completed ? "#262626" : "#333333",
					borderLeftColor:
						task.color && APP_COLORS[task.color]
							? APP_COLORS[task.color]
							: task.completed
								? "#262626"
								: "#333333",
					borderLeftWidth: task.color && APP_COLORS[task.color] ? "4px" : "1px",
					boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.06)",
				}}
			>
				{/* Checkbox */}
				<button
					type="button"
					className="flex-shrink-0"
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
					}}
					onKeyDown={(e: React.KeyboardEvent) => {
						if (e.key === "Enter" || e.key === " ") {
							// stop propagation so the surrounding Link doesn't navigate,
							// but don't prevent default so the button activation still occurs
							e.stopPropagation();
						}
					}}
				>
					<Checkbox
						isSelected={task.completed}
						onValueChange={async () => {
							if (task.id == null) {
								console.error("Cannot toggle completion: missing id");
								return;
							}
							await toggleTaskCompletion(String(task.id));
						}}
					/>
				</button>

				{/* Task Title */}
				<div className="flex-grow">
					<p
						className={`${task.completed ? "line-through" : ""} text-sm leading-[140%]`}
						style={{ color: task.completed ? "#808080" : "#F2F2F2" }}
					>
						{task.title}
					</p>
				</div>

				{/* Delete Button */}
				{!showConfirm ? (
					<button
						type="button"
						onClick={handleDeleteClick}
						className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded transition-colors hover:bg-gray-500"
						style={{ color: "#808080" }}
						aria-label="Delete task"
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>SVG Icon</title>
							<path
								d="M6 5H18L17 19H7L6 5Z"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M8 5V4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V5"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M10 9V15"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
							/>
							<path
								d="M14 9V15"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
							/>
						</svg>
					</button>
				) : (
					<div className="flex gap-2">
						<button
							type="button"
							onClick={handleCancelDelete}
							className="flex-shrink-0 h-8 px-3 text-sm font-medium rounded-md transition-colors bg-gray-500 hover:bg-gray-400 text-gray-100 border border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
							disabled={isDeleting}
						>
							Cancel
						</button>
						<button
							type="button"
							onClick={handleConfirmDelete}
							className="flex-shrink-0 h-8 px-3 text-sm font-medium rounded-md transition-colors bg-danger hover:bg-danger-dark text-white border border-danger disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
							disabled={isDeleting}
						>
							{isDeleting ? "Deleting..." : "Delete"}
						</button>
					</div>
				)}
			</div>
		</Link>
	);
}
