import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const clients = await db.client.findMany({
      where: {
        orgId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    revalidatePath('/clients');
    return NextResponse.json(clients);
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
