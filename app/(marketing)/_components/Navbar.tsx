import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className='flex items-center bg-white/80 fixed w-full h-14 px-4 top-0 border-b shadow-sm '>
      <div className='md:max-w-screen-2xl mx-auto w-full flex items-center justify-between'>
        <Logo />
        <div className='space-x-4 md:block md:w-auto flex items-center justify-between w-full'>
          <Button size={'sm'} variant={'outline'} asChild>
            <Link href='/sign-in'>Sign In</Link>
          </Button>
          <Button size={'sm'} asChild>
            <Link href='/sign-up'>Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};
