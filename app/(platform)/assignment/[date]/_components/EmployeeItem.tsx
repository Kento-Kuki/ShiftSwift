'use client';
import { cn } from '@/lib/utils';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Employee } from '@prisma/client';

interface EmployeeItemProps {
  employee: Employee;
  shiftId?: string | null;
}

const EmployeeItem = ({ employee, shiftId = null }: EmployeeItemProps) => {
  const { setNodeRef, isDragging, listeners, attributes, transform } =
    useDraggable({ id: employee.id, data: { employee, shiftId } });

  const style = {
    transform: CSS.Translate.toString(transform),
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      key={employee.id}
      className={cn(
        'flex items-center h-full bg-sky-300 rounded-sm p-2 truncate w-full justify-center hover:bg-sky-400 ',
        isDragging && 'opacity-80'
      )}
    >
      <p className='text-sm font-medium'>{employee.name}</p>
    </div>
  );
};

export default EmployeeItem;
