'use client';
import { Input } from '@/components/ui/input';
import EmployeeItem from './EmployeeItem';
import { Employee } from '@prisma/client';
import { useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';

interface AvailableEmployeesListProps {
  employees: Employee[];
}

const AvailableEmployeesList = ({ employees }: AvailableEmployeesListProps) => {
  const { setNodeRef, isOver } = useDroppable({ id: 'available-employees' });
  return (
    <div className='flex-shrink-0 w-60 flex flex-col '>
      <div className='p-4 mx-auto'>
        <Input placeholder='Search' />
      </div>
      <div
        ref={setNodeRef}
        className={cn(
          'grid grid-cols-2 gap-4 p-2 auto-rows-min h-full flex-1',
          isOver && 'bg-slate-200/60'
        )}
      >
        {employees.map((employee) => (
          <EmployeeItem key={employee.id} employee={employee} />
        ))}
      </div>
    </div>
  );
};

export default AvailableEmployeesList;
