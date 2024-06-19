import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import ShiftItem from './_components/ShiftItem';
import AvailableEmployeesList from './_components/AvailableEmployeesList';
import DateNavigationButtons from './_components/DateNavigationButtons';

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
    <main className='pt-14 pl-4 w-full 2xl:max-w-screen-2xl mx-auto h-full flex'>
      <div className='flex-1'>
        <DateNavigationButtons date={date} />
        <div className='flex flex-col gap-y-4 mt-5 mr-5'>
          {shifts.map((shift) => (
            <ShiftItem key={shift.id} shift={shift} />
          ))}
        </div>
      </div>
      <AvailableEmployeesList employees={employees} />
    </main>
  );
};

export default AssignmentDatePage;
