'use server';

import { auth } from '@clerk/nextjs/server';
import { InputType, ReturnType } from './types';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/createSafeAction';
import { DeleteSiteSchema } from './schema';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    };
  }

  const { id, clientId } = data;

  let site;
  try {
    site = await db.site.delete({
      where: {
        id,
        clientId,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      error: 'Failed to delete site',
    };
  }
  revalidatePath(`/clients/${site.clientId}/sites`);
  return { data: site };
};

export const deleteSite = createSafeAction(DeleteSiteSchema, handler);
