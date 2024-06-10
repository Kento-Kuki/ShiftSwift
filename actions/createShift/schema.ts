import { z } from 'zod';

export const CreateShiftSchema = z.object({
  date: z
    .string({
      required_error: 'Date is required',
      invalid_type_error: 'Date must be a date',
    })
    .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
      message: 'Invalid date format. Expected format: YYYY-MM-DD',
    }),
  startTime: z
    .string({
      required_error: 'Start time is required',
      invalid_type_error: 'Start time must be a string',
    })
    .refine((value) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(value), {
      message: 'Invalid start time format. Expected format: HH:mm',
    }),
  endTime: z
    .string({
      required_error: 'End time is required',
      invalid_type_error: 'End time must be a string',
    })
    .refine((value) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(value), {
      message: 'Invalid end time format. Expected format: HH:mm',
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
