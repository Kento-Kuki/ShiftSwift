import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    const availableEmployees = await db.employee.findMany({
      where: {
        orgId,
        shiftAssignments: {
          none: {
            shift: {
              date: {
                equals: new Date(`${date}T00:00:00`),
              },
            },
          },
        },
      },
    });

    return NextResponse.json(availableEmployees);
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
