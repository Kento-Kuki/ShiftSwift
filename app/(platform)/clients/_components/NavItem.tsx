'use client';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Client } from '@prisma/client';

import { Activity, Settings, Store } from 'lucide-react';
import Image from 'next/image';
import { useParams, usePathname, useRouter } from 'next/navigation';

interface NavItemProps {
  onExpand: (id: string) => void;
  client: Client;
  isExpanded: boolean;
}

const NavItem = ({ onExpand, client, isExpanded }: NavItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const clientId = params.clientId;
  const routes = [
    {
      label: 'Sites',
      icon: <Store className='w-4 h-4 mr-2' />,
      href: `/clients/${client.id}/sites`,
    },
    {
      label: 'Activity',
      icon: <Activity className='w-4 h-4 mr-2' />,
      href: `/clients/${client.id}/activity`,
    },
    {
      label: 'Settings',
      icon: <Settings className='w-4 h-4 mr-2' />,
      href: `/clients/${client.id}/settings`,
    },
  ];
  const isActive = (href: string) => {
    return pathname.includes(href);
  };

  const onClick = (href: string) => {
    router.push(href);
  };
  return (
    <AccordionItem value={client.id} className='border-none'>
      <AccordionTrigger
        onClick={() => onExpand(client.id)}
        className={cn(
          'flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline',
          clientId === client.id && !isExpanded && 'bg-sky-500/10 text-sky-700'
        )}
      >
        <div className='flex items-center gap-x-2'>
          <div className='w-7 h-7 relative'>
            <Image
              src={client.imageUrl}
              alt={client.name}
              fill
              className='object-cover rounded-sm'
            />
          </div>
          <span className='text-sm font-medium'>{client.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className='pt-1 text-neutral-700'>
        {routes.map((route) => (
          <Button
            key={route.href}
            size={'sm'}
            onClick={() => onClick(route.href)}
            className={cn(
              'w-full font-normal justify-start pl-10 mb-1',
              isActive(route.href) && 'bg-sky-500/10 text-sky-700'
            )}
            variant={'ghost'}
          >
            {route.icon}
            {route.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default NavItem;

NavItem.Skeleton = function SkeletonNavItem() {
  return (
    <div className=' flex items-center gap-x-2'>
      <div className=' w-10 h-10 relative shrink-0'>
        <Skeleton className='w-full h-full absolute' />
      </div>
      <Skeleton className='h-10 w-full' />
    </div>
  );
};
