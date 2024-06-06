import { z } from 'zod';
import { Site } from '@prisma/client';
import { ActionState } from '@/lib/createSafeAction';
import { DeleteSiteSchema } from './schema';

export type InputType = z.infer<typeof DeleteSiteSchema>;
export type ReturnType = ActionState<InputType, Site>;
