import { z } from 'zod';
import { ShiftAssignment } from '@prisma/client';
import { ActionState } from '@/lib/createSafeAction';
import { UpdateShiftAssignmentSchema } from './schema';

export type InputType = z.infer<typeof UpdateShiftAssignmentSchema>;
export type ReturnType = ActionState<InputType, ShiftAssignment>;
