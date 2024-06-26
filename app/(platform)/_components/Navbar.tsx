import Link from 'next/link';
import { format } from 'date-fns';
import { Plus } from 'lucide-react';
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';

import { Logo } from '@/components/Logo';
import MobileSidebar from './MobileNavbar';
import { Button } from '@/components/ui/button';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';

const Navbar = async () => {
  const { orgId } = auth();
  if (!orgId) return redirect('/select-org');

  const clients = await db.client.findMany({
    where: { orgId },
    orderBy: {
      createdAt: 'asc',
    },
  });
  const today = format(new Date(), 'yyyy-MM-dd');
  const yearMonth = today.substring(0, 7);
  return (
    <nav className='flex items-center bg-white/80 fixed w-full h-14 px-4 top-0 border-b shadow-sm '>
      <MobileSidebar today={today} yearMonth={yearMonth} clients={clients} />
      <div className='md:hidden block'>
        <Link href={'/register-employee'}>
          <Button size={'icon'} variant={'primary'}>
            <Plus className='h-4 w-4' />
          </Button>
        </Link>
      </div>
      <div className='md:max-w-screen-2xl mx-auto w-full flex items-center justify-between'>
        <div className='hidden md:block flex-1'>
          <Logo />
        </div>

        <div className='hidden md:flex items-center justify-between gap-x-5 lg:gap-x-10 flex-1'>
          <Link
            href={'/clients'}
            className=' hover:opacity-75 transition text-sm font-base text-gray-600 ml-2'
          >
            Clients
          </Link>
          <Link
            href={`/assignment/${today}`}
            className=' hover:opacity-75 transition text-sm font-base text-gray-600 ml-2'
          >
            Assignment
          </Link>
          <Link
            href={`/schedule/${yearMonth}`}
            className=' hover:opacity-75 transition text-sm font-base text-gray-600 ml-2'
          >
            Schedule
          </Link>
          <Link
            href={'/employees'}
            className=' hover:opacity-75 transition text-sm font-base text-gray-600'
          >
            Employees
          </Link>
          <Button size={'sm'} asChild variant={'primary'}>
            <Link href={'/register-employee'}>Register </Link>
          </Button>
        </div>

        <div className='ml-auto md:ml-0 flex items-center gap-x-2 lg:gap-x-4 justify-end flex-1'>
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
