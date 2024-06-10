import { z } from 'zod';
import { Shift } from '@prisma/client';
import { ActionState } from '@/lib/createSafeAction';
import { CreateShiftSchema } from './schema';

export type InputType = z.infer<typeof CreateShiftSchema>;
export type ReturnType = ActionState<InputType, Shift>;
