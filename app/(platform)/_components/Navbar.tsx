import { Logo } from '@/components/Logo';
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';
import { AlignJustify } from 'lucide-react';
import React from 'react';
import MobileSidebar from './MobileSidebar';

const Navbar = () => {
  return (
    <nav className='flex items-center bg-white/80 fixed w-full h-14 px-4 top-0 border-b shadow-sm '>
      <MobileSidebar />
      <div className='md:max-w-screen-2xl mx-auto w-full flex items-center justify-between'>
        <div className='hidden md:block'>
          <Logo />
        </div>
        <div className='ml-auto flex items-center gap-x-2 justify-between'>
          <OrganizationSwitcher
            hidePersonal
            afterCreateOrganizationUrl={'/clients'}
            afterLeaveOrganizationUrl={'/select-org'}
            afterSelectOrganizationUrl={'/clients'}
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
