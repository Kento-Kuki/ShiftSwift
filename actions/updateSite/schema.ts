import { z } from 'zod';

export const UpdateSiteSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .min(3, { message: 'Name is too short' }),

  location: z
    .string({
      required_error: 'Location is required',
      invalid_type_error: 'Location must be a string',
    })
    .min(3, { message: 'Location is too short' }),

  requirements: z.array(
    z.string({
      invalid_type_error: 'Requirements must be a string',
    })
  ),

  description: z
    .string({
      invalid_type_error: 'Description must be a string',
    })
    .max(100, { message: 'Description is too long' })
    .optional(),

  clientId: z.string(),

  id: z.string(),
});
