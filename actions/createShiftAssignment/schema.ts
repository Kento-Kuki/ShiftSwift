import { z } from 'zod';

export const CreateShiftAssignmentSchema = z.object({
  shiftId: z.string(),
  employeeId: z.string(),
});
