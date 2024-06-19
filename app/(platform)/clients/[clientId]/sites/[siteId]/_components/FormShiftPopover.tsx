'use client';

import { toast } from 'sonner';
import { X } from 'lucide-react';
import { useParams } from 'next/navigation';
import { ElementRef, useMemo, useRef } from 'react';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from '@/components/ui/popover';
import { useAction } from '@/hooks/useAction';
import { Button } from '@/components/ui/button';
import { createShift } from '@/actions/createShift';
import { useShiftForm } from '@/hooks/useShiftForm';
import FormButton from '@/components/form/FormButton';
import { FormInput } from '@/components/form/FormInput';
import { TIME_OPTIONS } from '@/constants/selectOptions';
import { FormSelect } from '@/components/form/FormSelect';
import { FormDatePicker } from '@/components/form/FormDatePicker';
import { useAvailableEmployees } from '@/hooks/useAvailableEmployees';

interface FormPopoverProps {
  children: React.ReactNode;
  side?: 'left' | 'right' | 'top' | 'bottom';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
}

const FormShiftPopover = ({
  children,
  side = 'right',
  align = 'center',
  sideOffset = 10,
}: FormPopoverProps) => {
  const { clientId, siteId } = useParams() as {
    clientId: string;
    siteId: string;
  };
  const {
    date,
    setDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    employee,
    setEmployee,
  } = useShiftForm();
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

  // Server Action
  const { execute, fieldErrors } = useAction(createShift, {
    onSuccess: () => {
      toast.success('Shift created successfully');
      closeRef.current?.click();
    },
    onError: () => {
      toast.error('Failed to create shift');
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
      siteId,
      clientId,
    });
  };
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        side={side}
        align={align}
        sideOffset={sideOffset}
        className=' p-6 space-y-4'
      >
        <div className='fixed top-0 left-0 right-0 h-10 bg-white/95 z-10 flex items-center py-2'>
          <div className=' h-full relative w-full flex items-center justify-center'>
            <h2 className='text-lg font-bold  text-neutral-700'>
              Add new shift
            </h2>
            <PopoverClose ref={closeRef} asChild>
              <Button
                className='h-auto w-auto p-1 absolute right-2 top-0 text-neutral-600'
                variant='ghost'
              >
                <X className='h-4 w-4' />
              </Button>
            </PopoverClose>
          </div>
        </div>
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
            defaultValue='1'
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
          <FormButton className='w-full'>Add</FormButton>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default FormShiftPopover;
