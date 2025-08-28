"use client";

import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useTaskContext } from "@/context/TaskContext";
import { type CreateTaskInput, type Task, TaskSchema } from "@/types/task";
import { APP_COLORS, COLOR_ORDER, DESIGN_TOKENS } from "@/utils/colors";

interface TaskFormProps {
	task?: Task;
	isEditing?: boolean;
}

export function TaskForm({ task, isEditing = false }: TaskFormProps) {
	const router = useRouter();
	const { createTask, updateTask } = useTaskContext();

	const [formData, setFormData] = useState<CreateTaskInput>({
		title: "",
		color: undefined, // No default color - should be optional
		completed: false,
	});

	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formError, setFormError] = useState<string | null>(null);
	const [showSuccess, setShowSuccess] = useState(false);

	useEffect(() => {
		if (isEditing && task) {
			setFormData({
				title: task.title,
				color: task.color,
				completed: task.completed,
			});
		}
	}, [task, isEditing]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value, type } = e.target as HTMLInputElement;

		setFormData((prev) => ({
			...prev,
			[name]:
				type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
		}));

		// Clear error when field is edited
		if (errors[name]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const validateForm = (): boolean => {
		try {
			// Use Zod to validate the form data
			TaskSchema.parse({
				...formData,
				id: task?.id, // Include ID if editing
			});
			setErrors({});
			return true;
		} catch (error) {
			if (error instanceof z.ZodError) {
				const formattedErrors: { [key: string]: string } = {};
				error.issues.forEach((err: z.ZodIssue) => {
					const path = err.path[0]?.toString() || "";
					formattedErrors[path] = err.message;
				});
				setErrors(formattedErrors);
			}
			return false;
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log("TaskForm submit clicked", { isEditing, formData });
		setFormError(null);
		if (!validateForm()) {
			return;
		}

		setIsSubmitting(true);

		try {
			if (isEditing && task && task.id) {
				await updateTask({ ...formData, id: task.id });
			} else {
				// If no color is selected, use the first color as default
				const taskData = {
					...formData,
					color: formData.color || ("red" as const),
				};
				await createTask(taskData);
			}

			// Show success animation
			setShowSuccess(true);

			// Wait for animation to complete before redirecting
			setTimeout(() => {
				router.push("/");
			}, 1000);
		} catch (error) {
			console.error("Error submitting task:", error);
			setFormError("Failed to save task. See console for details.");
			setIsSubmitting(false);
		}
	};

	return (
		<div className="w-full max-w-[736px] mx-auto mt-24">
			<div className="flex flex-col gap-12">
				{/* Back Arrow - show for both editing and creating */}
				<button
					onClick={() => router.push("/")}
					className="w-6 h-6 flex items-center justify-center"
					aria-label="Go back"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M19 12H5M5 12L12 19M5 12L12 5"
							stroke="white"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>

				<form onSubmit={handleSubmit} className="flex flex-col gap-6">
					{/* Title Section */}
					<div className="flex flex-col gap-3">
						<label
							htmlFor="title"
							className="font-bold text-sm leading-[17px]"
							style={{ color: DESIGN_TOKENS.colors.blue }}
						>
							Title
						</label>
						<div
							className="flex items-center p-4 gap-3 rounded-lg border border-solid"
							style={{
								backgroundColor: DESIGN_TOKENS.colors.gray500,
								borderColor: DESIGN_TOKENS.colors.gray400,
								boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.06)",
							}}
						>
							<input
								type="text"
								id="title"
								name="title"
								value={formData.title}
								onChange={handleChange}
								className="flex-1 bg-transparent border-none outline-none font-normal text-sm leading-[140%]"
								style={{
									color: formData.title
										? DESIGN_TOKENS.colors.gray100
										: DESIGN_TOKENS.colors.gray100,
								}}
								placeholder="Ex. Brush you teeth"
							/>
						</div>
						{errors.title && (
							<p
								className="text-sm"
								style={{ color: DESIGN_TOKENS.colors.danger }}
							>
								{errors.title}
							</p>
						)}
					</div>

					{/* Color Section */}
					<div className="flex flex-col gap-3">
						<label
							className="font-bold text-sm leading-[17px]"
							style={{ color: DESIGN_TOKENS.colors.blue }}
						>
							Color
						</label>
						<div className="flex gap-4 flex-wrap">
							{COLOR_ORDER.map((colorKey) => (
								<label
									key={colorKey}
									className="relative w-[52px] h-[52px] rounded-full cursor-pointer flex items-center justify-center"
									style={{
										backgroundColor: APP_COLORS[colorKey],
										border:
											formData.color === colorKey
												? `2px solid ${DESIGN_TOKENS.colors.white}`
												: "none",
										opacity:
											!formData.color || formData.color === colorKey ? 1 : 0.7,
									}}
								>
									<input
										type="radio"
										name="color"
										value={colorKey}
										checked={formData.color === colorKey}
										onChange={handleChange}
										className="sr-only"
									/>
									{formData.color === colorKey && (
										<svg
											width="20"
											height="20"
											viewBox="0 0 20 20"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M16.25 6.25L8.125 14.375L3.75 10"
												stroke="white"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									)}
								</label>
							))}
						</div>
					</div>

					{formError && (
						<div
							className="text-sm text-center"
							style={{ color: DESIGN_TOKENS.colors.danger }}
						>
							{formError}
						</div>
					)}

					{/* Submit Button */}
					<button
						type="submit"
						disabled={isSubmitting || showSuccess}
						className="flex justify-center items-center p-4 gap-2 w-full h-[52px] rounded-lg font-bold text-sm leading-[140%]"
						style={{
							backgroundColor: DESIGN_TOKENS.colors.blueDark,
							color: DESIGN_TOKENS.colors.gray100,
						}}
					>
						<span className="relative">
							{showSuccess ? "Saved!" : isEditing ? "Save" : "Add Task"}
						</span>

						{/* Icon container with fixed dimensions */}
						<div className="w-5 h-5 flex items-center justify-center">
							{showSuccess ? (
								<svg
									width="20"
									height="20"
									viewBox="0 0 20 20"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									className="absolute"
								>
									<path
										d="M16.25 6.25L8.125 14.375L3.75 10"
										stroke="white"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeDasharray="20"
										strokeDashoffset="20"
										style={{
											animation: "drawCheck 0.6s ease-in-out forwards",
										}}
									/>
								</svg>
							) : !isSubmitting && !isEditing ? (
								<svg
									width="16"
									height="16"
									viewBox="0 0 16 16"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M8 3.33334V12.6667M3.33334 8H12.6667"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							) : !isSubmitting && isEditing ? (
								<svg
									width="20"
									height="20"
									viewBox="0 0 20 20"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M16.25 6.25L8.125 14.375L3.75 10"
										stroke="white"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							) : null}
						</div>
					</button>

					{/* Loading text below button */}
					{isSubmitting && (
						<div
							className="text-center text-sm mt-2"
							style={{ color: DESIGN_TOKENS.colors.gray300 }}
						>
							Saving...
						</div>
					)}
				</form>
			</div>
		</div>
	);
}

// Helper function to convert color names to CSS values
// color values come from src/utils/colors.ts (APP_COLORS)
