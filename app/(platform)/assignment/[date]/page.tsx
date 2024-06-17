import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { DatePicker } from './_components/DatePicker';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ShiftItem from './_components/ShiftItem';
import { ShiftWithAssignments } from '@/types';

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

  if (!shifts) {
    return <div>No shifts found</div>;
  }
  return (
    <main className='mt-20 container flex h-full'>
      <div className='flex-1'>
        <div className='flex items-center justify-center md:justify-start gap-x-5 '>
          <Button variant={'primary'} size={'icon'}>
            <ChevronLeft className='h-4 w-4' />
          </Button>
          <DatePicker currentDate={date} />
          <Button variant={'primary'} size={'icon'}>
            <ChevronRight className='h-4 w-4' />
          </Button>
        </div>
        <div className='flex flex-col gap-y-4 mt-5 mr-5'>
          {shifts.map((shift) => (
            <ShiftItem key={shift.id} shift={shift} />
          ))}
        </div>
      </div>
      <div className='h-full flex-shrink-0 w-60 bg-white/80'>Employees</div>
    </main>
  );
};

export default AssignmentDatePage;
