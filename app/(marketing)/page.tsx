import { Button } from '@/components/ui/button';
import { Medal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import localFont from 'next/font/local';
import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';

const headingFont = localFont({
  src: '../../public/fonts/CalSans-SemiBold.woff2',
  display: 'swap',
});

const textFont = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
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
          <div className='flex items-center border shadow-sm bg-amber-100 text-amber-700 rounded-full uppercase p-3 pt-4 md:p-5 md:pt-6 md:text-xl'>
            <Medal className='w-6 h-6 mr-2' />
            Shift Mastery Achieved
          </div>
          <h1 className='text-6xl font-bold md:text-8xl'>
            Master Your Schedule
          </h1>
          <div className='text-2xl md:text-5xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-md p-2 w-fit pt-3 align-middle'>
            Work Streamlined
          </div>
          <p
            className={cn(
              'text-sm md:text-xl text-slate-600',
              textFont.className
            )}
          >
            ShiftSwift offers a seamless solution for efficient shift
            management, empowering businesses to optimize scheduling with ease.
            Say goodbye to scheduling headaches and hello to effortless
            organization with ShiftSwift.
          </p>
        </div>
        <Button className='mt-6' size={'lg'} asChild>
          <Link href='/sign-up'>Get Started</Link>
        </Button>
      </div>
    </div>
  );
};

export default MarketingPage;
