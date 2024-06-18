'use client';
import { useState } from 'react';
import { addDays, format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';

export function DatePicker({ currentDate }: { currentDate: string }) {
  const [date, setDate] = useState<Date>();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-40 justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date ? (
            format(date, 'yyyy-MM-dd')
          ) : currentDate ? (
            currentDate
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align='start'
        className='flex w-auto flex-col space-y-2 p-2'
      >
        <Select
          onValueChange={(value) =>
            setDate(addDays(new Date(), parseInt(value)))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder='Select' />
          </SelectTrigger>
          <SelectContent position='popper'>
            <SelectItem value='0'>Today</SelectItem>
            <SelectItem value='1'>Tomorrow</SelectItem>
            <SelectItem value='3'>In 3 days</SelectItem>
            <SelectItem value='7'>In a week</SelectItem>
          </SelectContent>
        </Select>
        <div className='rounded-md border'>
          <Calendar
            mode='single'
            selected={date}
            onSelect={(date) => {
              setDate(date);
              setIsOpen(false);
              router.push(`/assignment/${format(date!, 'yyyy-MM-dd')}`);
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
