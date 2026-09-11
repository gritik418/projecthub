import { z } from "zod";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

const CreateTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Task title is required")
    .max(200, "Task title cannot exceed 200 characters"),

  description: z
    .string()
    .trim()
    .max(1000, "Description cannot exceed 1000 characters")
    .optional(),

  status: z
    .enum(["TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"])
    .default("TODO")
    .optional(),

  priority: z
    .enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"])
    .default("MEDIUM")
    .optional(),

  dueDate: z.string().min(1, "Due date is required"),

  projectId: z.string().uuid("Invalid project ID"),

  assignedDeveloperId: z.string().uuid("Invalid developer ID"),
});

export type CreateTaskDto = z.infer<typeof CreateTaskSchema>;

export default CreateTaskSchema;
