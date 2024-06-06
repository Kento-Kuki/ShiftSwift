import { z } from 'zod';

export const DeleteSiteSchema = z.object({
  id: z.string(),
  clientId: z.string(),
});
