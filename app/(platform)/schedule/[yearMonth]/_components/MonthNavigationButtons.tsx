'use client';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { addMonths, format, parseISO, subMonths } from 'date-fns';

import { Button } from '@/components/ui/button';

interface MonthNavigationButtonsProps {
  yearMonth: string;
}

const MonthNavigationButtons = ({ yearMonth }: MonthNavigationButtonsProps) => {
  const router = useRouter();
  const onPreviousMonth = () => {
    const currentDate = parseISO(yearMonth);
    const previousMonth = subMonths(currentDate, 1);
    const previousYearMonth = format(previousMonth, 'yyyy-MM');
    router.push(`/schedule/${previousYearMonth}`);
  };

  const onNextMonth = () => {
    const currentDate = parseISO(yearMonth);
    const nextMonth = addMonths(currentDate, 1);
    const nextYearMonth = format(nextMonth, 'yyyy-MM');
    router.push(`/schedule/${nextYearMonth}`);
  };
  return (
    <div className='flex items-center justify-center md:justify-start gap-x-5 py-4 '>
      <Button variant={'primary'} size={'navigation'} onClick={onPreviousMonth}>
        <ChevronLeft className='h-4 w-4' />
      </Button>
      <div className='text-lg w-20 text-center'>{yearMonth}</div>
      <Button variant={'primary'} size={'navigation'} onClick={onNextMonth}>
        <ChevronRight className='h-4 w-4' />
      </Button>
    </div>
  );
};

export default MonthNavigationButtons;
