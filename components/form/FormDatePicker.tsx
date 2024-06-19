'use client';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Label } from '../ui/label';
import FormErrors from './FormErrors';

interface FormDatePickerProps {
  id: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: Date;
  onBlur?: () => void;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}
export function FormDatePicker({
  id,
  label,
  required,
  disabled,
  errors,
  className,
  defaultValue,
  onBlur,
  date,
  setDate,
}: FormDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { pending } = useFormStatus();

  return (
    <>
      <div className=' space-y-2'>
        <div className='space-y-1'>
          {label ? (
            <Label
              htmlFor={id}
              className='text-xs font-semibold text-neutral-700 block'
            >
              {label}
            </Label>
          ) : null}
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-[240px] justify-start text-left font-normal',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className='mr-2 h-4 w-4' />
                {date ? format(date, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar
                disabled={disabled || pending}
                mode='single'
                selected={date}
                onSelect={(selectedDate) => {
                  setDate(selectedDate);
                  setIsOpen(false);
                }}
                initialFocus
                required={required}
              />
            </PopoverContent>
          </Popover>
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
      <input
        type='hidden'
        value={date ? format(date, 'yyyy-MM-dd') : ''}
        name={id}
      />
    </>
  );
}
