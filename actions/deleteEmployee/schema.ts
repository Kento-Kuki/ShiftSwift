import { z } from 'zod';

export const DeleteEmployeeSchema = z.object({
  id: z.string(),
});
