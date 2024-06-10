import { z } from 'zod';
import { Shift } from '@prisma/client';
import { ActionState } from '@/lib/createSafeAction';
import { DeleteShiftSchema } from './schema';

export type InputType = z.infer<typeof DeleteShiftSchema>;
export type ReturnType = ActionState<InputType, Shift>;
