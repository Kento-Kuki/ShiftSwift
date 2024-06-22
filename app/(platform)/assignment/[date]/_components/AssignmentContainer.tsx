'use client';
import DateNavigationButtons from './DateNavigationButtons';
import ShiftItem from './ShiftItem';
import AvailableEmployeesList from './AvailableEmployeesList';
import { Employee } from '@prisma/client';
import { ShiftWithAssignments } from '@/types';
import { DndContext, DragEndEvent, pointerWithin } from '@dnd-kit/core';
import { useAction } from '@/hooks/useAction';
import { createShiftAssignment } from '@/actions/createShiftAssignment';
import { toast } from 'sonner';
import { updateShiftAssignment } from '@/actions/updateShiftAssignment';

interface AssignmentContainerProps {
  shifts: ShiftWithAssignments[];
  employees: Employee[];
  date: string;
}
const AssignmentContainer = ({
  shifts,
  employees,
  date,
}: AssignmentContainerProps) => {
  const { execute: assignToShift } = useAction(createShiftAssignment, {
    onSuccess: () => {
      toast.success('Assigned successfully');
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const { execute: updateShift } = useAction(updateShiftAssignment, {
    onSuccess: (data) => {
      console.log(data);
      toast.success('Assigned successfully');
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    const currentShiftId = active.data.current?.shiftId;
    const targetId = over?.id;

    // Handle drop into the 'available-employees' area
    if (targetId === 'available-employees') {
      if (!currentShiftId) return;

      // Execute logic to remove from the current shift
      updateShift({
        employeeId: active.id as string,
        targetShiftId: targetId as string,
        currentShiftId: currentShiftId as string,
      });
      return;
    }

    // Handle drop onto a different shift than the current one
    if (currentShiftId && targetId !== currentShiftId) {
      updateShift({
        employeeId: active.id as string,
        targetShiftId: targetId as string,
        currentShiftId: currentShiftId as string,
      });
      return;
    }

    // If drop onto the same shift, do nothing
    if (currentShiftId && targetId === currentShiftId) return;

    // Handle drop onto a new shift from the 'available-employees' area
    assignToShift({
      employeeId: active.id as string,
      shiftId: targetId as string,
    });
  };

  return (
    <DndContext
      autoScroll={false}
      onDragEnd={onDragEnd}
      collisionDetection={pointerWithin}
    >
      <div className='flex h-full'>
        <div className='flex-1 flex flex-col'>
          <DateNavigationButtons date={date} />
          <div className='flex flex-col gap-y-4 my-5 mr-5 assignment-container'>
            {shifts.map((shift) => (
              <ShiftItem key={shift.id} shift={shift} />
            ))}
          </div>
        </div>
        <AvailableEmployeesList employees={employees} />
      </div>
    </DndContext>
  );
};

export default AssignmentContainer;
