'use server';
import { auth } from '@clerk/nextjs/server';
import { InputType, ReturnType } from './types';
import { db } from '@/lib/db';
import { createSafeAction } from '@/lib/createSafeAction';
import { CreateEmployeeSchema } from './schema';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    };
  }

  const { name, email, phone, skills, imageUrl } = data;

  let employee;
  try {
    employee = await db.employee.create({
      data: {
        name,
        orgId,
        userId,
        email,
        phone,
        skills,
        imageUrl,
      },
    });
  } catch (error) {
    return {
      error: 'Failed to create employee',
    };
  }
  return { data: employee };
};

export const createEmployee = createSafeAction(CreateEmployeeSchema, handler);
