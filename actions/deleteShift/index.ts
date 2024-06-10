'use server';

import { auth } from '@clerk/nextjs/server';
import { InputType, ReturnType } from './types';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/createSafeAction';
import { DeleteShiftSchema } from './schema';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    };
  }

  const { id, clientId, siteId } = data;
  let deletedShift;
  try {
    deletedShift = await db.$transaction(async (prisma) => {
      await prisma.shiftAssignment.deleteMany({
        where: {
          shiftId: id,
        },
      });
      const shift = await prisma.shift.delete({
        where: {
          id,
        },
      });

      return shift;
    });
  } catch (error) {
    console.error(error);
    return {
      error: 'Failed to delete shift',
    };
  }
  revalidatePath(`/clients/${clientId}/sites/${siteId}`);
  return { data: deletedShift };
};

export const deleteShift = createSafeAction(DeleteShiftSchema, handler);
