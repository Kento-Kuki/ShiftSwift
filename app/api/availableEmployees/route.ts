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
    const startTime = new Date(`${date}T${searchParams.get('startTime')}:00Z`);
    const endTime = new Date(`${date}T${searchParams.get('endTime')}:00Z`);

    const availableEmployees = await db.employee.findMany({
      where: {
        orgId,
        shiftAssignments: {
          none: {
            shift: {
              AND: [
                {
                  startTime: {
                    lte: endTime,
                  },
                  endTime: {
                    gte: startTime,
                  },
                },
              ],
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
