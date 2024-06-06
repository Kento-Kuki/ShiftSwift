'use server';

import { auth } from '@clerk/nextjs/server';
import { InputType, ReturnType } from './types';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/createSafeAction';
import { UpdateSiteSchema } from './schema';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    };
  }
  const { name, location, requirements, description, clientId, id } = data;
  let site;
  try {
    site = await db.site.update({
      where: {
        id,
        clientId,
      },
      data: {
        name,
        location,
        requirements,
        description: description ? description : '',
      },
    });
  } catch (error) {
    return {
      error: 'Failed to update site',
    };
  }

  revalidatePath(`/clients/${clientId}/sites/${site.id}`);
  return { data: site };
};

export const updateSite = createSafeAction(UpdateSiteSchema, handler);
