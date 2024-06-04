import { z } from 'zod';

export const DeleteClientSchema = z.object({
  id: z.string(),
});
