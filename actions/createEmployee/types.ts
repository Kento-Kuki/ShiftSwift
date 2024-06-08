import { z } from 'zod';
import { Employee } from '@prisma/client';
import { ActionState } from '@/lib/createSafeAction';
import { CreateEmployeeSchema } from './schema';

export type InputType = z.infer<typeof CreateEmployeeSchema>;
export type ReturnType = ActionState<InputType, Employee>;
