import { z } from 'zod';

export const UpdateShiftAssignmentSchema = z.object({
  currentShiftId: z.string(),
  targetShiftId: z.string(),
  employeeId: z.string(),
});
