'use server';

import { auth } from '@clerk/nextjs/server';
import { InputType, ReturnType } from './types';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/createSafeAction';
import { UpdateShiftAssignmentSchema } from './schema';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    };
  }

  const { currentShiftId, targetShiftId, employeeId } = data;

  let newShiftAssignment;

  try {
    newShiftAssignment = await db.$transaction(async (prisma) => {
      const deletedShiftAssignment = await prisma.shiftAssignment.delete({
        where: {
          shiftId_employeeId: {
            shiftId: currentShiftId,
            employeeId: employeeId,
          },
        },
      });

      if (targetShiftId === 'available-employees')
        return deletedShiftAssignment;

      const shiftAssignment = await prisma.shiftAssignment.create({
        data: {
          shiftId: targetShiftId,
          employeeId,
        },
      });
      return shiftAssignment;
    });
  } catch (error) {
    console.error(error);
    return {
      error: 'Failed to assign employee to the shift',
    };
  }
  revalidatePath('/assignment');
  return { data: newShiftAssignment };
};

export const updateShiftAssignment = createSafeAction(
  UpdateShiftAssignmentSchema,
  handler
);
