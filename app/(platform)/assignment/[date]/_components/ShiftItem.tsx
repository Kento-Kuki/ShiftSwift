import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ShiftWithAssignments } from '@/types';
import Image from 'next/image';
import EmployeeItem from './EmployeeItem';

interface ShiftItemProps {
  shift: ShiftWithAssignments;
}
const ShiftItem = ({ shift }: ShiftItemProps) => {
  return (
    <Card className='w-full'>
      <CardHeader className='border-b p-3'>
        <h2 className='font-medium'>
          <span className='font-bold'>{shift.site?.client?.name}</span> |{' '}
          {shift.site?.name}
        </h2>
      </CardHeader>
      <CardContent className='flex justify-between items-top p-2'>
        <div className='flex flex-col gap-y-2 flex-1 text-sm text-gray-600 '>
          <p>
            Time:{' '}
            {shift.startTime.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}{' '}
            -{' '}
            {shift.endTime.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
          <p>Location: {shift.site?.location}</p>
          <div>
            Requirements:{' '}
            {shift.site?.requirements.map((requirement) => (
              <Badge variant={'secondary'} key={requirement}>
                {requirement}
              </Badge>
            ))}
          </div>
          <p>Description: {shift.site?.description}</p>
        </div>
        <div className='flex-shrink-0 w-2/5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-2 bg-slate-100 p-2 gap-2 h-full rounded-sm'>
          {shift.shiftAssignments.map((assignment) => (
            <EmployeeItem key={assignment.id} employee={assignment.employee} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ShiftItem;
