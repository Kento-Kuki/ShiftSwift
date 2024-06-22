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
        equals: new Date(date),
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
  });

  const employees = await db.employee.findMany({
    where: {
      orgId,
      shiftAssignments: {
        none: {
          shift: {
            date: new Date(date),
          },
        },
      },
    },
  });

  if (!shifts) {
    return <div>No shifts found</div>;
  }

  return (
    <main className='pt-14 pb-8 pl-4 w-full 2xl:max-w-screen-xl mx-auto'>
      <AssignmentContainer date={date} shifts={shifts} employees={employees} />
    </main>
  );
};

export default AssignmentDatePage;
