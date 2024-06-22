'use server';

import { auth } from '@clerk/nextjs/server';
import { InputType, ReturnType } from './types';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/createSafeAction';
import { CreateShiftAssignmentSchema } from './schema';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    };
  }

  const { shiftId, employeeId } = data;

  let shiftAssignment;

  try {
    shiftAssignment = await db.shiftAssignment.create({
      data: {
        shiftId,
        employeeId,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      error: 'Failed to assign employee to the shift',
    };
  }

  revalidatePath('/assignment');
  return { data: shiftAssignment };
};

export const createShiftAssignment = createSafeAction(
  CreateShiftAssignmentSchema,
  handler
);
