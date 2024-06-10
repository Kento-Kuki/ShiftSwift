import { z } from 'zod';

export const DeleteShiftSchema = z.object({
  id: z.string(),
  clientId: z.string(),
  siteId: z.string(),
});
