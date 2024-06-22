'use client';
import EmployeeItem from './EmployeeItem';
import { Badge } from '@/components/ui/badge';
import { ShiftWithAssignments } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';

interface ShiftItemProps {
  shift: ShiftWithAssignments;
}
const ShiftItem = ({ shift }: ShiftItemProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: shift.id,
    data: { shift },
  });
  return (
    <Card className='w-full'>
      <CardHeader className='border-b p-3'>
        <h2 className='font-medium'>
          <span className='font-bold'>{shift.site?.client?.name}</span> |{' '}
          {shift.site?.name}
        </h2>
      </CardHeader>
      <CardContent className='flex justify-between items-top py-0'>
        <div className='flex flex-col gap-y-2 flex-1 text-sm text-gray-600 py-4 '>
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
            {shift.site.requirements[0] === '' ? (
              <span className=' text-xs font-medium text-gray-800 pl-1'>
                No requirements
              </span>
            ) : (
              shift.site.requirements.map((requirement) => (
                <Badge variant={'secondary'} key={requirement}>
                  {requirement}
                </Badge>
              ))
            )}
          </div>
          <p>Description: {shift.site?.description}</p>
        </div>
        <div
          ref={setNodeRef}
          className={cn(
            'flex-shrink-0 w-2/5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-2 p-4 gap-3 h-full rounded-sm my-auto',
            isOver && 'bg-slate-100'
          )}
        >
          {shift.shiftAssignments.map((assignment) => (
            <EmployeeItem
              key={assignment.id}
              employee={assignment.employee}
              shiftId={assignment.shiftId}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ShiftItem;
