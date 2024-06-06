'use server';

import { auth } from '@clerk/nextjs/server';
import { InputType, ReturnType } from './types';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/createSafeAction';
import { DeleteClientSchema } from './schema';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    };
  }

  const { id } = data;

  let client;
  try {
    client = await db.client.delete({
      where: {
        id,
        orgId,
      },
    });
  } catch (error) {
    return {
      error: 'Failed to delete client',
    };
  }
  revalidatePath(`/clients`);
  return { data: client };
};

export const deleteClient = createSafeAction(DeleteClientSchema, handler);
