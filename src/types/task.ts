import { z } from "zod";

export const TaskColorEnum = z.enum([
	"red",
	"blue",
	"green",
	"purple",
	"yellow",
	"orange",
	"pink",
	"gray",
]);
export type TaskColor = z.infer<typeof TaskColorEnum>;

export const TaskSchema = z.object({
	// Backend uses numeric IDs, frontend converts to string
	id: z.union([z.string(), z.number()]).optional(),
	title: z.string().min(1, "Title is required"),
	color: TaskColorEnum.optional(),
	completed: z.boolean().default(false),
	createdAt: z.union([z.date(), z.string()]).optional(),
	updatedAt: z.union([z.date(), z.string()]).optional(),
});

export type Task = z.infer<typeof TaskSchema>;

export const CreateTaskSchema = TaskSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
});
export type CreateTaskInput = z.infer<typeof CreateTaskSchema>;

export const UpdateTaskSchema = TaskSchema.partial().required({ id: true });
export type UpdateTaskInput = z.infer<typeof UpdateTaskSchema>;
