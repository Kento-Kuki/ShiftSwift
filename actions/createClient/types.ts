import { z } from 'zod';
import { Client } from '@prisma/client';
import { ActionState } from '@/lib/createSafeAction';
import { CreateClientSchema } from './schema';

export type InputType = z.infer<typeof CreateClientSchema>;
export type ReturnType = ActionState<InputType, Client>;
