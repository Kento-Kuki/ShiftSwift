'use server';

import { auth } from '@clerk/nextjs/server';
import { InputType, ReturnType } from './types';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/createSafeAction';
import { CreateShiftSchema } from './schema';

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
    siteId,
    clientId,
  } = data;

  let newShift;

  try {
    newShift = await db.$transaction(async (prisma) => {
      const shift = await prisma.shift.create({
        data: {
          siteId,
          date: new Date(`${date}T00:00:00Z`),
          startTime: new Date(`${date}T${startTime}:00Z`),
          endTime: new Date(`${date}T${endTime}:00Z`),
          headcount,
        },
      });

      await prisma.shiftAssignment.createMany({
        data: employees.map((employeeId) => ({
          shiftId: shift.id,
          employeeId,
        })),
      });

      return shift;
    });
  } catch (error) {
    console.error(error);
    return {
      error: 'Failed to create shift',
    };
  }

  revalidatePath(`/clients/${clientId}/sites/${siteId}`);
  return { data: newShift };
};

export const createShift = createSafeAction(CreateShiftSchema, handler);
