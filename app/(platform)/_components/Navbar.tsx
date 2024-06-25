import Link from 'next/link';
import { format } from 'date-fns';
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';

import { Logo } from '@/components/Logo';
import MobileSidebar from './MobileSidebar';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const today = format(new Date(), 'yyyy-MM-dd');
  const yearMonth = today.substring(0, 7);
  return (
    <nav className='flex items-center bg-white/80 fixed w-full h-14 px-4 top-0 border-b shadow-sm '>
      <MobileSidebar today={today} />
      <div className='md:max-w-screen-2xl mx-auto w-full flex items-center justify-between'>
        <div className='flex items-center gap-x-6'>
          <div className='hidden md:block'>
            <Logo />
          </div>
          <Button size={'sm'} asChild variant={'primary'}>
            <Link href={'/register-employee'}>Register </Link>
          </Button>
        </div>

        <div className='ml-auto flex items-center gap-x-2 lg:gap-x-4 justify-between'>
          <Link
            href={'/clients'}
            className='hidden md:inline hover:opacity-75 transition text-sm font-base text-gray-600 mr-2'
          >
            Clients
          </Link>
          <Link
            href={`/assignment/${today}`}
            className='hidden md:inline hover:opacity-75 transition text-sm font-base text-gray-600 mr-2'
          >
            Assignment
          </Link>
          <Link
            href={`/schedule/${yearMonth}`}
            className='hidden md:inline hover:opacity-75 transition text-sm font-base text-gray-600 mr-2'
          >
            Schedule
          </Link>
          <Link
            href={'/employees'}
            className='hidden md:inline hover:opacity-75 transition text-sm font-base text-gray-600'
          >
            Employees
          </Link>
          <OrganizationSwitcher
            hidePersonal
            afterCreateOrganizationUrl={'/register-employee'}
            afterLeaveOrganizationUrl={'/select-org'}
            afterSelectOrganizationUrl={'/register-employee'}
            appearance={{
              elements: {
                rootBox: {
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              },
            }}
          />
          <UserButton
            afterSignOutUrl={'/'}
            appearance={{
              elements: {
                avatarBox: {
                  height: 30,
                  width: 30,
                },
              },
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
