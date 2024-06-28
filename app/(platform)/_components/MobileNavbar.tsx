'use client';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { useMobileNavbar } from '@/hooks/useMobileNavbar';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Logo } from '@/components/Logo';

interface MobileNavbarProps {
  today: string;
  yearMonth: string;
}

const MobileNavbar = ({ today, yearMonth }: MobileNavbarProps) => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const onOpen = useMobileNavbar((state) => state.onOpen);
  const onClose = useMobileNavbar((state) => state.onClose);
  const isOpen = useMobileNavbar((state) => state.isOpen);

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
        className='block md:hidden mr-2'
        onClick={onOpen}
        variant={'ghost'}
        size={'sm'}
      >
        <Menu className='h-4 w-4' />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side={'left'} className='px-0 pt-2'>
          <Logo />
          <div className='flex flex-col justify-center items-center py-4'>
            <Link
              href={'/clients'}
              className='text-md w-full h-10 flex items-center justify-center hover:bg-gray-100'
            >
              Clients
            </Link>
            <Link
              href={`/assignment/${today}`}
              className='text-md w-full h-10 flex items-center justify-center hover:bg-gray-100'
            >
              Assignment
            </Link>
            <Link
              href={`/schedule/${yearMonth}`}
              className='text-md w-full h-10 flex items-center justify-center hover:bg-gray-100'
            >
              Schedule
            </Link>
            <Link
              href={'/employees'}
              className='text-md w-full h-10 flex items-center justify-center hover:bg-gray-100'
            >
              Employees
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileNavbar;
