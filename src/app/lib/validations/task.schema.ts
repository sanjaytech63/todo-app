import { z } from 'zod';

export const TaskStatusEnum = z.enum(['pending', 'in-progress', 'completed']);

export const CreateTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  status: TaskStatusEnum.optional(),
});
