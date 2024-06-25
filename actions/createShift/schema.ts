import { z } from 'zod';

export const CreateShiftSchema = z.object({
  date: z.string({
    required_error: 'Date is required',
    invalid_type_error: 'Date must be a string',
  }),

  startTime: z.string({
    required_error: 'Start time is required',
    invalid_type_error: 'Start time must be a string',
  }),

  endTime: z.string({
    required_error: 'End time is required',
    invalid_type_error: 'End time must be a string',
  }),

  headcount: z
    .number({
      required_error: 'Headcount is required',
      invalid_type_error: 'Headcount must be a number',
    })
    .min(1, { message: 'Headcount must be at least 1' }),
  employees: z
    .array(
      z.string({
        required_error: 'Employees must be a string',
        invalid_type_error: 'Employees must be a string',
      })
    )
    .min(1, { message: 'At least one employee must be assigned' }),
  siteId: z.string(),
  clientId: z.string(),
});
