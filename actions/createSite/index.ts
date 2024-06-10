'use server';

import { auth } from '@clerk/nextjs/server';
import { InputType, ReturnType } from './types';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/createSafeAction';
import { CreateSiteSchema } from './schema';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return {
      error: 'Unauthorized',
    };
  }

  const { name, location, requirements, description, clientId } = data;

  let site;
  try {
    site = await db.site.create({
      data: {
        name,
        clientId,
        location,
        requirements,
        description: description ? description : '',
      },
    });
  } catch (error) {
    return {
      error: 'Failed to create site',
    };
  }

  revalidatePath(`/clients/${clientId}/sites`);
  return { data: site };
};

export const createSite = createSafeAction(CreateSiteSchema, handler);
