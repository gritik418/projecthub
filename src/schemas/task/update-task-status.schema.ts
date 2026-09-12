import { z } from "zod";

const UpdateTaskStatusSchema = z.object({
  status: z.enum(["TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"]),
});

export type UpdateTaskStatusDto = z.infer<typeof UpdateTaskStatusSchema>;

export default UpdateTaskStatusSchema;
