'use client';
import Link from 'next/link';
import { Menu, PanelRightClose } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import Sidebar from '../_components/Sidebar';
import { useMobileSidebar } from '@/hooks/useMobileSidebar';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Client } from '@prisma/client';

interface MobileSidebarProps {
  clients: Client[];
}

const MobileSidebar = ({ clients }: MobileSidebarProps) => {
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

  if (!isMounted) return null;

  return (
    <>
      <Button
        className='block md:hidden'
        onClick={onOpen}
        variant={'ghost'}
        size={'icon'}
      >
        <PanelRightClose className='w-6 h-6 mx-auto' />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side={'left'} className='p-2 pt-10'>
          <Sidebar
            clients={clients}
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
