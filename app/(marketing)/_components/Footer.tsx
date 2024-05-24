import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';

export const Footer = () => {
  return (
    <div className='bg-slate-100 fixed w-full bottom-0 border-t p-2'>
      <div className='md:max-w-screen-2xl mx-auto w-full flex items-center justify-between'>
        <Logo />
        <div className='space-x-4 md:block md:w-auto flex items-center justify-between w-full'>
          <Button size={'sm'} variant={'ghost'} className='hover:underline'>
            Privacy Policy
          </Button>
          <Button size={'sm'} variant={'ghost'} className='hover:underline'>
            Terms of Service
          </Button>
        </div>
      </div>
    </div>
  );
};
