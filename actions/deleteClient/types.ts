import { z } from 'zod';
import { Client } from '@prisma/client';
import { ActionState } from '@/lib/createSafeAction';
import { DeleteClientSchema } from './schema';

export type InputType = z.infer<typeof DeleteClientSchema>;
export type ReturnType = ActionState<InputType, Client>;
