'use server';
import { auth } from '@clerk/nextjs/server';
import { InputType, ReturnType } from './types';
import { db } from '@/lib/db';
import { createSafeAction } from '@/lib/createSafeAction';
import { UpdateEmployeeSchema } from './schema';
import { revalidatePath } from 'next/cache';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    };
  }

  const { name, email, phone, skills, id } = data;
  let employee;
  try {
    employee = await db.employee.update({
      where: {
        id,
        orgId,
      },
      data: {
        name,
        email,
        phone,
        skills,
      },
    });
  } catch (error) {
    return {
      error: 'Failed to update employee',
    };
  }
  revalidatePath('/employees');
  return { data: employee };
};

export const updateEmployee = createSafeAction(UpdateEmployeeSchema, handler);
