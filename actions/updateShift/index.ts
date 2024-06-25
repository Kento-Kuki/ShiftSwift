'use server';

import { auth } from '@clerk/nextjs/server';
import { InputType, ReturnType } from './types';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/createSafeAction';
import { UpdateShiftSchema } from './schema';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    };
  }
  const {
    date,
    startTime,
    endTime,
    headcount,
    employees,
    clientId,
    siteId,
    id,
  } = data;
  let updatedShift;
  try {
    updatedShift = await db.$transaction(async (prisma) => {
      const shift = await prisma.shift.update({
        where: {
          id,
          siteId,
        },
        data: {
          date,
          startTime,
          endTime,
          headcount,
        },
      });

      await prisma.shiftAssignment.deleteMany({
        where: {
          shiftId: id,
        },
      });

      await prisma.shiftAssignment.createMany({
        data: employees.map((employeeId) => ({
          shiftId: id,
          employeeId,
        })),
      });

      return shift;
    });
  } catch (error) {
    console.error(error);
    return {
      error: 'Failed to update shift',
    };
  }

  revalidatePath(`/clients/${clientId}/sites/${siteId}`);
  return { data: updatedShift };
};

export const updateShift = createSafeAction(UpdateShiftSchema, handler);
