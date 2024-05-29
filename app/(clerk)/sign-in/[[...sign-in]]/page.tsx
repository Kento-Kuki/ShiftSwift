import { SignIn, ClerkLoaded, ClerkLoading } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2'>
      <div className='h-full hidden lg:flex items-center justify-center '>
        <Link href='/' passHref className='hover:opacity-75 transition'>
          <Image
            src={'/images/logo_transparent.png'}
            width={500}
            height={500}
            alt={'logo'}
            priority
          />
        </Link>
      </div>
      <div className='h-full lg:flex flex-col items-center justify-center px-4'>
        <div className=' text-center space-y-4 pt-16'>
          <h1 className=' font-bold text-3xl text-[#2E2A47]'>Welcome Back!</h1>
          <p className='text-base text-[#7E8CA0]'>
            Sign in or Create account to get back to your shifts!
          </p>
        </div>
        <div className='flex justify-center items-center mt-8'>
          <ClerkLoaded>
            <SignIn path='/sign-in' />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className='animate-spin text-muted-foreground w-20 h-20' />
          </ClerkLoading>
        </div>
      </div>
    </div>
  );
}
