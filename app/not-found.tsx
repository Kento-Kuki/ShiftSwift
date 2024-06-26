'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='text-center space-y-4 px-5'>
        <Image
          src='/images/not-found.svg'
          width={300}
          height={300}
          alt='404 image'
          className='mx-auto'
        />
        <h1 className='text-4xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
          Oops! Page not found.
        </h1>
        <p className='text-muted-foreground md:text-lg'>
          The page you're looking for doesn't exist. Let's get you back on
          track.
        </p>

        <Button className='px-8' size={'lg'} onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    </div>
  );
}
