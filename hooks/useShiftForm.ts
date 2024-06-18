import { Option } from '@/types';
import { useState } from 'react';

export const useShiftForm = (
  initialDate?: Date,
  initialStartTime?: Option | Option[] | null,
  initialEndTime?: Option | Option[] | null,
  initialEmployee?: Option | Option[] | null
) => {
  const [date, setDate] = useState<Date | undefined>(initialDate || undefined);
  const [startTime, setStartTime] = useState<Option | Option[] | null>(
    initialStartTime || null
  );
  const [endTime, setEndTime] = useState<Option | Option[] | null>(
    initialEndTime || null
  );
  const [employee, setEmployee] = useState<Option | Option[] | null>(
    initialEmployee || null
  );
  return {
    date,
    setDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    employee,
    setEmployee,
  };
};
