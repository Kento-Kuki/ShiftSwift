'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { EmployeeWithShifts } from '@/types';
import { getDaysInMonth, format, getDate } from 'date-fns';

interface ScheduleTableProps {
  employees: EmployeeWithShifts[];
  month: Date;
}

const ScheduleTable = ({ employees, month }: ScheduleTableProps) => {
  const daysInMonth = getDaysInMonth(month);
  const daysArray = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1
  );

  return (
    <Table>
      <TableHeader className='bg-indigo-100'>
        <TableRow>
          <TableHead className='w-36'>Name</TableHead>
          {daysArray.map((day) => (
            <TableHead key={day} className='w-20 text-center'>
              {day}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell>{employee.name}</TableCell>
            {daysArray.map((day) => {
              const shiftAssignment = employee.shiftAssignments.find(
                (assignment) => getDate(assignment.shift.date) === day
              );
              return (
                <TableCell
                  key={day}
                  className={cn(
                    'p-2 w-24 border',
                    shiftAssignment && 'bg-slate-100'
                  )}
                >
                  {shiftAssignment && (
                    <div className='flex flex-col justify-center items-center text-xs'>
                      <span className='font-medium'>
                        {format(shiftAssignment.shift.startTime, 'H:mm')}
                      </span>
                      <span>≀</span>
                      <span className='font-medium'>
                        {format(shiftAssignment.shift.endTime, 'H:mm')}
                      </span>
                    </div>
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ScheduleTable;
