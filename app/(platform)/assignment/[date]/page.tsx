import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import AssignmentContainer from './_components/AssignmentContainer';

const AssignmentDatePage = async ({
  params: { date },
}: {
  params: { date: string };
}) => {
  const { orgId } = auth();
  if (!orgId) return redirect('/select-org');
  const shifts = await db.shift.findMany({
    where: {
      date: {
        equals: new Date(`${date}T00:00:00`),
      },
    },
    include: {
      site: {
        include: {
          client: {
            select: {
              name: true,
            },
          },
        },
      },
      shiftAssignments: {
        include: {
          employee: true,
        },
      },
    },
    orderBy: {
      site: {
        client: {
          name: 'asc',
        },
      },
    },
  });

  const employees = await db.employee.findMany({
    where: {
      orgId,
      shiftAssignments: {
        none: {
          shift: {
            date: new Date(`${date}T00:00:00`),
          },
        },
      },
    },
    orderBy: {
      name: 'asc',
    },
  });

  return (
    <main className='pt-14 pl-4 w-full 2xl:max-w-screen-xl mx-auto h-screen'>
      <AssignmentContainer date={date} shifts={shifts} employees={employees} />
    </main>
  );
};

export default AssignmentDatePage;
