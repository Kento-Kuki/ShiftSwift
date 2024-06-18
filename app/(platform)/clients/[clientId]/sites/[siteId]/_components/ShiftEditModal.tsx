'use client';
import { toast } from 'sonner';
import { useParams } from 'next/navigation';
import { Employee, Shift } from '@prisma/client';
import { ElementRef, useMemo, useRef } from 'react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAction } from '@/hooks/useAction';
import { Button } from '@/components/ui/button';
import { updateShift } from '@/actions/updateShift';
import { useShiftForm } from '@/hooks/useShiftForm';
import FormButton from '@/components/form/FormButton';
import { FormInput } from '@/components/form/FormInput';
import { TIME_OPTIONS } from '@/constants/selectOptions';
import { FormSelect } from '@/components/form/FormSelect';
import { formatDateToTime } from '@/utils/formatDateToTime';
import { FormDatePicker } from '@/components/form/FormDatePicker';
import { useAvailableEmployees } from '@/hooks/useAvailableEmployees';

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
  const formattedTimes = useMemo(() => {
    return {
      startTime: {
        label: formatDateToTime(shift.startTime),
        value: formatDateToTime(shift.startTime),
      },
      endTime: {
        label: formatDateToTime(shift.endTime),
        value: formatDateToTime(shift.endTime),
      },
    };
  }, [shift, assignedEmployees]);
  const assignedEmployeesOptions = useMemo(
    () =>
      assignedEmployees.map((employee) => ({
        value: employee.id,
        label: employee.name,
      })),
    [assignedEmployees]
  );
  const {
    date,
    setDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    employee,
    setEmployee,
  } = useShiftForm(
    shift.date,
    formattedTimes.startTime,
    formattedTimes.endTime,
    assignedEmployeesOptions
  );

  const { clientId, siteId } = useParams() as {
    clientId: string;
    siteId: string;
  };
  const closeRef = useRef<ElementRef<'button'>>(null);
  const { availableEmployees, isLoading, isOpen, setIsOpen } =
    useAvailableEmployees(date, startTime, endTime);

  const availableEmployeesOptions = useMemo(() => {
    if (!availableEmployees || isLoading) return [];
    return availableEmployees.map((availableEmployee) => ({
      value: availableEmployee.id,
      label: availableEmployee.name,
    }));
  }, [availableEmployees, isLoading]);

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

    // TODO: Add detected changes
    execute({
      date,
      startTime,
      endTime,
      headcount: parseInt(headcount),
      employees,
      siteId,
      clientId,
      id: shift.id,
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <form action={onSubmit} className='space-y-3'>
          <FormDatePicker
            id={'date'}
            label={'Date'}
            date={date}
            setDate={setDate}
            errors={fieldErrors}
          />
          <div className='flex gap-x-4'>
            <div className='flex-1'>
              <FormSelect
                id={'startTime'}
                label={'Start Time'}
                options={TIME_OPTIONS}
                selectedOption={startTime}
                setSelectedOption={setStartTime}
                errors={fieldErrors}
              />
            </div>
            <div className='flex-1'>
              <FormSelect
                id={'endTime'}
                label={'End Time'}
                options={TIME_OPTIONS}
                selectedOption={endTime}
                setSelectedOption={setEndTime}
                errors={fieldErrors}
              />
            </div>
          </div>
          <FormInput
            id='headcount'
            label='Headcount'
            type='number'
            defaultValue={shift.headcount.toString()}
            errors={fieldErrors}
          />
          <FormSelect
            id='employees'
            label='Employees'
            placeholder='Assign employees here'
            options={availableEmployeesOptions}
            selectedOption={employee}
            setSelectedOption={setEmployee}
            isMulti
            errors={fieldErrors}
            isLoading={isLoading}
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
