import { Employee } from '@prisma/client';

interface EmployeeItemProps {
  employee: Employee;
}

const EmployeeItem = ({ employee }: EmployeeItemProps) => {
  return (
    <div
      key={employee.id}
      className='flex items-center h-full bg-sky-200 rounded-sm p-2 truncate w-full justify-center'
    >
      <p className='text-sm font-medium'>{employee.name}</p>
    </div>
  );
};

export default EmployeeItem;
