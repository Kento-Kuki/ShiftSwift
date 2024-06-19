'use client';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DatePicker } from './DatePicker';
import { useRouter } from 'next/navigation';
import { addDays, format, parseISO, subDays } from 'date-fns';
interface DateNavigationButtonsProps {
  date: string;
}

const DateNavigationButtons = ({ date }: DateNavigationButtonsProps) => {
  const router = useRouter();
  const onPreviousDay = () => {
    const currentDate = parseISO(date);
    const previousDay = subDays(currentDate, 1);
    router.push(`/assignment/${format(previousDay, 'yyyy-MM-dd')}`);
  };

  const onNextDay = () => {
    const currentDate = parseISO(date);
    const nextDay = addDays(currentDate, 1);
    router.push(`/assignment/${format(nextDay, 'yyyy-MM-dd')}`);
  };
  return (
    <div className='flex items-center justify-center md:justify-start gap-x-5 pt-4 '>
      <Button variant={'primary'} size={'icon'} onClick={onPreviousDay}>
        <ChevronLeft className='h-4 w-4' />
      </Button>
      <DatePicker currentDate={date} />
      <Button variant={'primary'} size={'icon'} onClick={onNextDay}>
        <ChevronRight className='h-4 w-4' />
      </Button>
    </div>
  );
};

export default DateNavigationButtons;
