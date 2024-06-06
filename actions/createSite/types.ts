import { z } from 'zod';
import { Site } from '@prisma/client';
import { ActionState } from '@/lib/createSafeAction';
import { CreateSiteSchema } from './schema';

export type InputType = z.infer<typeof CreateSiteSchema>;
export type ReturnType = ActionState<InputType, Site>;
