'use client';
import Image from 'next/image';
import { useMemo } from 'react';
import { Client } from '@prisma/client';
import { useParams } from 'next/navigation';
import { useOrganization } from '@clerk/nextjs';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { Skeleton } from '@/components/ui/skeleton';
const Info = () => {
  const { organization } = useOrganization();
  const params = useParams();
  const queryClient = useQueryClient();
  const { data: clients, isLoading } = useQuery<Client[]>({
    queryKey: ['clients', organization?.id],
    initialData: () => queryClient.getQueryData<Client[]>(['clients']),
  });
  const client = useMemo(() => {
    return clients?.find((client) => client.id === params.clientId);
  }, [clients, params.clientId]);

  if (isLoading) {
    return <Info.Skeleton />;
  }
  return (
    <div className='flex items-center gap-x-4'>
      <div className='w-[40px] h-[40px] relative'>
        <Image
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          src={client?.imageUrl!}
          alt='Client Icon'
          className='rounded-md object-cover'
        />
      </div>
      <p className='font-semibold text-xl hover:opacity-75'>{client?.name}</p>
    </div>
  );
};

Info.Skeleton = function SkeletonInfo() {
  return (
    <div className='flex items-center gap-x-4'>
      <div className='w-[40px] h-[40px] relative'>
        <Skeleton className='w-full h-full absolute' />
      </div>
      <Skeleton className='h-10 w-[200px]' />
    </div>
  );
};

export default Info;
