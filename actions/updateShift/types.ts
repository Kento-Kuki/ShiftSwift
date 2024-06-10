import { z } from 'zod';
import { Shift } from '@prisma/client';
import { ActionState } from '@/lib/createSafeAction';
import { UpdateShiftSchema } from './schema';

export type InputType = z.infer<typeof UpdateShiftSchema>;
export type ReturnType = ActionState<InputType, Shift>;
