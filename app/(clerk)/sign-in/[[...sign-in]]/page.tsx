import { SignIn, ClerkLoaded, ClerkLoading } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <div className='flex justify-center items-center mt-8'>
      <ClerkLoaded>
        <SignIn path='/sign-in' />
      </ClerkLoaded>
      <ClerkLoading>
        <Loader2 className='animate-spin text-muted-foreground w-20 h-20' />
      </ClerkLoading>
    </div>
  );
}
