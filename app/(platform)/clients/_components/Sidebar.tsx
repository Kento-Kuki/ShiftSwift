'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ContactRound, Plus } from 'lucide-react';
import FormClientPopover from './FormClientPopover';
import { Client } from '@/types';
import { Accordion } from '@/components/ui/accordion';
import NavItem from './NavItem';
import { useLocalStorage } from 'usehooks-ts';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/lib/fetcher';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface SidebarProps {
  storageKey?: string;
}

const Sidebar = ({ storageKey = 't-sidebar-state' }: SidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );
  const [clients, setClients] = useState<Client[]>([]);

  const { data, isLoading, error } = useQuery<Client[]>({
    queryKey: ['clients'],
    queryFn: () => fetcher('/api/clients'),
  });

  useEffect(() => {
    if (data) {
      setClients(data);
    }
    if (error) {
      toast.error(error.message);
    }
  }, [data]);

  const defaultAccordionValue = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }
      return acc;
    },
    []
  );

  const onExpand = (id: string) => {
    setExpanded((curr) => ({ ...curr, [id]: !expanded[id] }));
  };

  return (
    <div className='flex flex-col gap-y-2'>
      {/* SidebarHeader */}
      <div className='flex items-center mb-1 justify-between'>
        <div className='flex justify-between items-center'>
          <ContactRound className='w-6 h-6 mr-1' />
          <span className='text-2xl font-medium '>Clients</span>
        </div>
        <FormClientPopover side='right' align='center' sideOffset={10}>
          <Button
            size={'icon'}
            variant={'ghost'}
            type='button'
            asChild
            className='ml-auto'
          >
            <Plus className='w-6 h-6' />
          </Button>
        </FormClientPopover>
      </div>

      {/* SidebarSearch */}
      <div className='mx-1 mb-2'>
        <Input placeholder='Search...' className='w-full h-8' />
      </div>

      {/* SidebarList */}
      {isLoading ? (
        <div className='space-y-2'>
          <NavItem.Skeleton />
          <NavItem.Skeleton />
          <NavItem.Skeleton />
        </div>
      ) : !clients.length ? (
        <div className='flex flex-col items-center gap-y-5 mt-3'>
          <Image
            src={'/images/noClients.png'}
            width={150}
            height={150}
            alt={'Not found'}
          />
          <p>You don't have any clients.</p>
        </div>
      ) : (
        <Accordion
          type='multiple'
          defaultValue={defaultAccordionValue}
          className='space-y-2'
        >
          {clients.map((client: Client) => (
            <NavItem
              key={client.id}
              onExpand={onExpand}
              client={client}
              isExpanded={expanded[client.id]}
            />
          ))}
        </Accordion>
      )}
    </div>
  );
};

export default Sidebar;
