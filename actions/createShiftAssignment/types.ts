import { z } from 'zod';
import { ShiftAssignment } from '@prisma/client';
import { ActionState } from '@/lib/createSafeAction';
import { CreateShiftAssignmentSchema } from './schema';

export type InputType = z.infer<typeof CreateShiftAssignmentSchema>;
export type ReturnType = ActionState<InputType, ShiftAssignment>;
