'use server';

import { auth } from '@clerk/nextjs/server';
import { InputType, ReturnType } from './types';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/createSafeAction';
import { CreateClientSchema } from './schema';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    };
  }

  const { name, address, email, phone, image } = data;

  const [imageId, imageUrl, imageLinkHTML, imageUserName] = image.split('|');

  if (!imageId || !imageUrl || !imageLinkHTML || !imageUserName) {
    return {
      error: 'Missing fields. Failed to create client',
    };
  }
  let client;
  try {
    client = await db.client.create({
      data: {
        name,
        orgId,
        address,
        email,
        phone,
        imageId,
        imageUrl,
        imageLinkHTML,
        imageUserName,
      },
    });
  } catch (error) {
    return {
      error: 'Failed to create client',
    };
  }

  revalidatePath(`/clients/${client.id}/sites`);
  return { data: client };
};

export const createClient = createSafeAction(CreateClientSchema, handler);
