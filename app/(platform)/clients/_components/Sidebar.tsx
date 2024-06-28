'use client';
import { Client } from '@prisma/client';
import { useLocalStorage } from 'usehooks-ts';
import { ContactRound, Plus } from 'lucide-react';

import NavItem from './NavItem';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import FormClientPopover from './FormClientPopover';
import { Accordion } from '@/components/ui/accordion';
import { useEffect, useState } from 'react';

interface SidebarProps {
  clients: Client[];
  storageKey?: string;
  popoverSide?: 'left' | 'right' | 'top' | 'bottom';
  popoverAlign?: 'start' | 'center' | 'end';
  popoverSideOffset?: number;
}

const Sidebar = ({
  clients,
  storageKey = 't-sidebar-state',
  popoverSide = 'right',
  popoverAlign = 'start',
  popoverSideOffset = 10,
}: SidebarProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );

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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <div className='flex flex-col gap-y-2'>
      {/* SidebarHeader */}
      <div className='flex items-center mb-1 justify-between'>
        <div className='flex justify-between items-center'>
          <ContactRound className='w-6 h-6 mr-1' />
          <span className='text-2xl font-medium'>Clients</span>
        </div>
        <FormClientPopover
          side={popoverSide}
          sideOffset={popoverSideOffset}
          align={popoverAlign}
        >
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
      {clients?.length === 0 ? (
        <div className='flex flex-col items-center mt-3'>
          <p className='text-lg'>You don&apos;t have any clients.</p>
          <p>Let&apos;s add a new one!</p>
        </div>
      ) : (
        <Accordion
          type='multiple'
          defaultValue={defaultAccordionValue}
          className='space-y-2'
        >
          {clients?.map((client: Client) => (
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
