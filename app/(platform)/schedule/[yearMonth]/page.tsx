import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { endOfMonth, startOfMonth } from 'date-fns';

import { db } from '@/lib/db';
import ScheduleTable from './_components/ScheduleTable';
import MonthNavigationButtons from './_components/MonthNavigationButtons';

const SchedulePage = async ({ params }: { params: { yearMonth: string } }) => {
  const { orgId } = auth();
  if (!orgId) return redirect('/select-org');
  const employees = await db.employee.findMany({
    where: {
      orgId,
    },
    include: {
      shiftAssignments: {
        where: {
          shift: {
            date: {
              gte: startOfMonth(new Date(`${params.yearMonth}-01T00:00:00`)),
              lte: endOfMonth(new Date(`${params.yearMonth}-01T00:00:00`)),
            },
          },
        },
        include: {
          shift: true,
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  });
  console.log();
  return (
    <main className='container py-16'>
      <MonthNavigationButtons yearMonth={params.yearMonth} />
      <ScheduleTable employees={employees} month={new Date(params.yearMonth)} />
    </main>
  );
};

export default SchedulePage;
