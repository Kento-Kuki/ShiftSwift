'use server';

import { auth } from '@clerk/nextjs/server';
import { InputType, ReturnType } from './types';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/createSafeAction';
import { DeleteEmployeeSchema } from './schema';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    };
  }
  const { id } = data;
  let employee;
  try {
    employee = await db.employee.delete({
      where: {
        id,
        orgId,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      error: 'Failed to delete employee',
    };
  }
  revalidatePath(`/employees`);
  return { data: employee };
};

export const deleteEmployee = createSafeAction(DeleteEmployeeSchema, handler);
