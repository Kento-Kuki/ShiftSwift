import { z } from 'zod';

export const CreateClientSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .min(1, { message: 'Name is required' }),

  address: z.string({
    required_error: 'Address is required',
    invalid_type_error: 'Address must be a string',
  }),

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

  image: z.string({
    required_error: 'Image is required',
    invalid_type_error: 'Image must be a string',
  }),
});
