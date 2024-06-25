import { useState } from 'react';
import { Employee } from '@prisma/client';
import { useOrganization } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';

import { Option } from '@/types';
import { fetcher } from '@/lib/fetcher';

export const useAvailableEmployees = (
  date?: Date | undefined,
  startTime?: Option | Option[] | null,
  endTime?: Option | Option[] | null
) => {
  const { organization } = useOrganization();
  const [isOpen, setIsOpen] = useState(false);

  const { data: availableEmployees, isLoading } = useQuery<Employee[]>({
    queryKey: [
      'availableEmployees',
      organization?.id,
      date,
      startTime,
      endTime,
    ],
    queryFn: async (): Promise<Employee[]> => {
      if (
        Array.isArray(startTime) ||
        Array.isArray(endTime) ||
        !startTime ||
        !endTime ||
        !date
      )
        return [];
      return fetcher(
        `/api/availableEmployees?date=${
          date.toISOString().split('T')[0]
        }&startTime=${startTime.value}&endTime=${endTime.value}`
      );
    },
    enabled: !!organization?.id && !!date && !!startTime && !!endTime && isOpen,
  });

  return {
    availableEmployees,
    isLoading,
    isOpen,
    setIsOpen,
  };
};
