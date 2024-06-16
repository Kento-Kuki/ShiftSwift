'use client';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from '@/components/ui/popover';
import { toast } from 'sonner';
import { ElementRef, useMemo, useRef } from 'react';
import { useParams } from 'next/navigation';
import FormButton from '@/components/form/FormButton';
import { useAction } from '@/hooks/useAction';
import { FormSelect } from '@/components/form/FormSelect';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/form/FormInput';
import { useOrganization } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';
import { Employee } from '@prisma/client';
import { fetcher } from '@/lib/fetcher';
import { createShift } from '@/actions/createShift';
import { FormDatePicker } from '@/components/form/FormDatePicker';
import { X } from 'lucide-react';
import { TIME_OPTIONS } from '@/constants/selectOptions';

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
    // execute({
    //   date,
    //   startTime,
    //   endTime,
    //   headcount: parseInt(headcount),
    //   employees,
    //   siteId: params.siteId as string,
    //   clientId: params.clientId as string,
    // });
    console.log({
      date,
      startTime,
      endTime,
      headcount: parseInt(headcount),
      employees,
      siteId: params.siteId as string,
      clientId: params.clientId as string,
    });
  };
  return (
    <Popover>
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
          <FormDatePicker id={'date'} label={'Date'} />
          <div className='flex gap-x-4'>
            <div className='flex-1'>
              <FormSelect
                id={'startTime'}
                label={'Start Time'}
                options={TIME_OPTIONS}
              />
            </div>
            <div className='flex-1'>
              <FormSelect
                id={'endTime'}
                label={'End Time'}
                options={TIME_OPTIONS}
              />
            </div>
          </div>
          <FormInput
            id='headcount'
            label='Headcount'
            type='number'
            defaultValue='1'
          />
          <FormSelect
            id='employees'
            label='Employees'
            placeholder='Assign employees here'
            options={employeesOptions}
            isMulti
          />
          <FormButton className='w-full'>Add</FormButton>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default FormShiftPopover;
