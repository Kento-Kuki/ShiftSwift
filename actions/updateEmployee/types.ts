import { z } from 'zod';
import { Employee } from '@prisma/client';
import { ActionState } from '@/lib/createSafeAction';
import { UpdateEmployeeSchema } from './schema';

export type InputType = z.infer<typeof UpdateEmployeeSchema>;
export type ReturnType = ActionState<InputType, Employee>;
