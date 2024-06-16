import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Employee } from '@prisma/client';
import { Pencil, Trash2 } from 'lucide-react';
import EmployeeEditModal from './EmployeeEditDialog';
import EmployeeAlertDialog from './EmployeeAlertDialog';

interface EmployeesListProps {
  employees: Employee[];
}

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV006',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
];
const EmployeesList = ({ employees }: EmployeesListProps) => {
  return (
    <Table className='mt-10'>
      <TableHeader className='bg-slate-100/50'>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>skills</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Email</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell>{employee.name}</TableCell>
            <TableCell>
              {employee.skills.map((skill) => (
                <Badge key={skill} variant={'secondary'} className='mr-2'>
                  {skill}
                </Badge>
              ))}
            </TableCell>
            <TableCell>
              {employee.phone.length === 10
                ? `${employee.phone.slice(0, 3)}-${employee.phone.slice(
                    3,
                    6
                  )}-${employee.phone.slice(6)}`
                : employee.phone}
            </TableCell>
            <TableCell className='text-sky-600 underline'>
              {employee.email}
            </TableCell>
            <TableCell className='flex items-center justify-end'>
              <EmployeeEditModal employee={employee}>
                <Button
                  variant={'ghost'}
                  size={'icon'}
                  className='hover:bg-transparent'
                >
                  <Pencil className='w-4 h-4 text-gray-500 hover:text-black' />
                </Button>
              </EmployeeEditModal>
              <EmployeeAlertDialog id={employee.id}>
                <Button
                  variant={'ghost'}
                  size={'icon'}
                  className='hover:bg-transparent'
                >
                  <Trash2 className='w-4 h-4 text-gray-500 hover:text-red-600' />
                </Button>
              </EmployeeAlertDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EmployeesList;
