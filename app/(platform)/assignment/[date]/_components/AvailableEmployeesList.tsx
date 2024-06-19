import { Input } from '@/components/ui/input';
import EmployeeItem from './EmployeeItem';
import { Employee } from '@prisma/client';

interface AvailableEmployeesListProps {
  employees: Employee[];
}

const AvailableEmployeesList = ({ employees }: AvailableEmployeesListProps) => {
  return (
    <div className='h-full flex-shrink-0 w-60 bg-white/80'>
      <div className='p-4 mx-auto'>
        <Input placeholder='Search' />
      </div>
      <div className='grid grid-cols-2 gap-4 p-2'>
        {employees.map((employee) => (
          <EmployeeItem key={employee.id} employee={employee} />
        ))}
      </div>
    </div>
  );
};

export default AvailableEmployeesList;
