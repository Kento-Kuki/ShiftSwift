import { Button } from '@/components/ui/button';
import { Medal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Kanit, Roboto } from 'next/font/google';

const headingFont = Kanit({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const textFont = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'swap',
});

const MarketingPage = () => {
  return (
    <div className='flex justify-center items-center h-full flex-col md:flex-row'>
      <div className='md:w-1/2 mx-auto mb-10 w-full'>
        <Image
          src='/images/marketingImage.png'
          alt='marketingImage'
          width={800}
          height={600}
        />
      </div>
      <div
        className={cn(
          'flex flex-col justify-center items-center w-1/2 gap-y-4',
          headingFont.className
        )}
      >
        <div className='text-center flex flex-col justify-center items-center gap-y-8 '>
          <div className='flex items-center border shadow-sm bg-amber-100 text-amber-700 rounded-full uppercase p-3 md:p-4  md:text-xl'>
            <Medal className='w-6 h-6 mr-2' />
            Shift Mastery Achieved
          </div>
          <h1 className='text-6xl font-semibold md:text-8xl'>
            Master Your Schedule
          </h1>
          <div className='text-2xl md:text-5xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-md p-2 w-fit align-middle italic pr-4 font-semibold'>
            Work Streamlined
          </div>
          <p
            className={cn(
              'text-sm md:text-xl text-slate-600 md:px-10',
              textFont.className
            )}
          >
            ShiftSwift offers a seamless solution for efficient shift
            management, empowering businesses to optimize scheduling with ease.
            Say goodbye to scheduling headaches and hello to effortless
            organization with ShiftSwift.
          </p>
        </div>
        <Button
          className='mt-4 px-12 tracking-widest text-lg'
          size={'lg'}
          asChild
        >
          <Link href='/sign-up'>Get Started</Link>
        </Button>
      </div>
    </div>
  );
};

export default MarketingPage;
