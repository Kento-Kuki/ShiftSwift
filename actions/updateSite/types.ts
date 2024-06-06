import { z } from 'zod';
import { Site } from '@prisma/client';
import { ActionState } from '@/lib/createSafeAction';
import { UpdateSiteSchema } from './schema';

export type InputType = z.infer<typeof UpdateSiteSchema>;
export type ReturnType = ActionState<InputType, Site>;
