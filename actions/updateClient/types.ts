import { z } from 'zod';
import { Client } from '@prisma/client';
import { ActionState } from '@/lib/createSafeAction';
import { UpdateClientSchema } from './schema';

export type InputType = z.infer<typeof UpdateClientSchema>;
export type ReturnType = ActionState<InputType, Client>;
