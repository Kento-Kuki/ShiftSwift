'use server';

import { auth } from '@clerk/nextjs/server';
import { InputType, ReturnType } from './types';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/createSafeAction';
import { UpdateClientSchema } from './schema';
import { v4 as uuidv4 } from 'uuid';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    };
  }
  const { name, address, email, phone, imageUrl, id } = data;
  let client;
  try {
    client = await db.client.update({
      where: {
        id,
        orgId,
      },
      data: {
        name,
        orgId,
        address,
        email,
        phone,
        imageUrl,
      },
    });
  } catch (error) {
    return {
      error: 'Failed to update client',
    };
  }

  revalidatePath(`/clients/${client.id}/settings`);
  return { data: client };
};

export const updateClient = createSafeAction(UpdateClientSchema, handler);
