import { z } from 'zod';
import { Employee } from '@prisma/client';
import { ActionState } from '@/lib/createSafeAction';
import { DeleteEmployeeSchema } from './schema';

export type InputType = z.infer<typeof DeleteEmployeeSchema>;
export type ReturnType = ActionState<InputType, Employee>;
