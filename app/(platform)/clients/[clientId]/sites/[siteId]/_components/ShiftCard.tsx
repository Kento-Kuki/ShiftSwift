import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { db } from '@/lib/db';
import { Shift } from '@prisma/client';
import Image from 'next/image';
import ShiftEditModal from './ShiftEditModal';
import ShiftAlertDialog from './ShiftAlertDialog';

interface ShiftCardProps {
  shift: Shift;
  clientId: string;
}

const ShiftCard = async ({ shift, clientId }: ShiftCardProps) => {
  const assignedEmployees = await db.shiftAssignment.findMany({
    where: {
      shiftId: shift.id,
    },
    include: {
      employee: true,
    },
  });

  return (
    <Card className='flex flex-col h-full'>
      <CardHeader>
        <div className='flex justify-between items-center text-gray-400 text-sm'>
          <span>{shift.date.toDateString()}</span>
          <span>
            {shift.startTime.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })}
            -
            {shift.endTime.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })}
          </span>
        </div>
      </CardHeader>
      <CardContent className='space-y-2 flex-grow pb-4'>
        {assignedEmployees.map((_employee) => (
          <div key={_employee.id} className='flex items-center gap-3'>
            <Image
              src={_employee.employee.imageUrl}
              alt={_employee.employee.name}
              width={30}
              height={30}
              className='rounded-full'
            />
            <p>{_employee.employee.name}</p>
          </div>
        ))}
      </CardContent>
      <CardFooter className='flex justify-end gap-x-4 pb-4'>
        <ShiftEditModal
          shift={shift}
          assignedEmployees={assignedEmployees.map(
            (_employee) => _employee.employee
          )}
        >
          <Button variant={'outline'} size={'sm'}>
            Edit
          </Button>
        </ShiftEditModal>
        <ShiftAlertDialog
          id={shift.id}
          siteId={shift.siteId}
          clientId={clientId}
        >
          <Button variant={'delete'} size={'sm'}>
            Delete
          </Button>
        </ShiftAlertDialog>
      </CardFooter>
    </Card>
  );
};

export default ShiftCard;
