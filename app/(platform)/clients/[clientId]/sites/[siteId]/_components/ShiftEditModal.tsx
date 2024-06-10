'use client';
import { updateShift } from '@/actions/updateShift';
import FormButton from '@/components/form/FormButton';
import { FormInput } from '@/components/form/FormInput';
import { FormSelect } from '@/components/form/FormSelect';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAction } from '@/hooks/useAction';
import { fetcher } from '@/lib/fetcher';
import { useOrganization } from '@clerk/nextjs';
import { Employee, Shift } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { ElementRef, useMemo, useRef } from 'react';
import { toast } from 'sonner';

interface ShiftEditModalProps {
  children: React.ReactNode;
  shift: Shift;
  assignedEmployees: Employee[];
}

const ShiftEditModal = ({
  children,
  shift,
  assignedEmployees,
}: ShiftEditModalProps) => {
  const params = useParams();
  const closeRef = useRef<ElementRef<'button'>>(null);
  const { organization } = useOrganization();
  const { data: employees, isLoading } = useQuery<Employee[]>({
    queryKey: ['employees', organization?.id],
    queryFn: () => fetcher('/api/employees'),
  });

  const employeesOptions = useMemo(() => {
    if (!employees) return [];
    return employees.map((employee) => ({
      value: employee.id,
      label: employee.name,
    }));
  }, [employees]);

  const assignedEmployeesOptions = useMemo(
    () =>
      assignedEmployees.map((employee) => ({
        value: employee.id,
        label: employee.name,
      })),
    [assignedEmployees]
  );

  const { execute, fieldErrors } = useAction(updateShift, {
    onSuccess: () => {
      toast.success('Shift updated');
      closeRef.current?.click();
    },
    onError: () => {
      toast.error('Failed to update shift');
    },
  });

  const onSubmit = (formData: FormData) => {
    const date = formData.get('date') as string;
    const startTime = formData.get('startTime') as string;
    const endTime = formData.get('endTime') as string;
    const employees = formData.getAll('employees') as string[];
    const headcount = formData.get('headcount') as string;
    execute({
      date,
      startTime,
      endTime,
      headcount: parseInt(headcount),
      employees,
      siteId: params.siteId as string,
      clientId: params.clientId as string,
      id: shift.id,
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <form action={onSubmit} className='space-y-3'>
          <FormInput
            id='date'
            label='Date'
            type='date'
            defaultValue={shift.date.toISOString().slice(0, 10)}
          />
          <div className='flex gap-x-4'>
            <div className='flex-1'>
              <FormInput
                id='startTime'
                label='Start Time'
                type='time'
                defaultValue={shift.startTime.toISOString().slice(11, 16)}
              />
            </div>
            <div className='flex-1'>
              <FormInput
                id='endTime'
                label='End Time'
                type='time'
                defaultValue={shift.endTime.toISOString().slice(11, 16)}
              />
            </div>
          </div>
          <FormInput
            id='headcount'
            label='Headcount'
            type='number'
            defaultValue={shift.headcount.toString()}
          />
          <FormSelect
            id='employees'
            label='Employees'
            placeholder='Assign employees here'
            options={employeesOptions}
            isMulti
            defaultValue={assignedEmployeesOptions}
          />
          <DialogFooter>
            <FormButton>Save</FormButton>
            <DialogClose ref={closeRef} asChild>
              <Button variant='outline' type='button'>
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ShiftEditModal;
