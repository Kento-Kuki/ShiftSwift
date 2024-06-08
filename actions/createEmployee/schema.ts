import { z } from 'zod';

export const CreateEmployeeSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .min(1, { message: 'Name is required' }),

  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email({ message: 'Invalid email address' }),

  phone: z
    .string({
      required_error: 'Phone is required',
      invalid_type_error: 'Phone must be a string',
    })
    .refine((val) => /^\+?[0-9]*$/.test(val), {
      message: 'Please enter the phone number without hyphens',
    }),

  skills: z.array(
    z.string({
      invalid_type_error: 'Skills must be a string',
    })
  ),

  imageUrl: z.string(),
});
