'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useMobileSidebar } from '@/hooks/useMobileSidebar';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from '../clients/_components/Sidebar';
import Link from 'next/link';

interface MobileSidebarProps {
  today: string;
}

const MobileSidebar = ({ today }: MobileSidebarProps) => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const onOpen = useMobileSidebar((state) => state.onOpen);
  const onClose = useMobileSidebar((state) => state.onClose);
  const isOpen = useMobileSidebar((state) => state.isOpen);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isMounted) null;

  return (
    <>
      <Button
        className='block md:hidden mr-2'
        onClick={onOpen}
        variant={'ghost'}
        size={'sm'}
      >
        <Menu className='h-4 w-4' />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side={'left'} className='p-2 pt-10'>
          <div className='flex justify-center items-center gap-2 py-4'>
            <Link
              href={'/clients'}
              className='hover:opacity-75 transition text-sm font-base text-gray-600 mr-2'
            >
              Clients
            </Link>
            <Link
              href={`/assignment/${today}`}
              className='hover:opacity-75 transition text-sm font-base text-gray-600 mr-2'
            >
              Assignment
            </Link>
            <Link
              href={'/employees'}
              className='hover:opacity-75 transition text-sm font-base text-gray-600'
            >
              Employees
            </Link>
          </div>
          <Sidebar
            storageKey='t-sidebar-mobile-state'
            popoverSide='bottom'
            popoverAlign='center'
          />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileSidebar;
