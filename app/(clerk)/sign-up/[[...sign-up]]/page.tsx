import { ClerkLoaded, ClerkLoading, SignUp } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';

export default function Page() {
  return (
    <div className='flex justify-center items-center my-8'>
      <ClerkLoaded>
        <SignUp path='/sign-up' forceRedirectUrl={'/clients'} />
      </ClerkLoaded>
      <ClerkLoading>
        <Loader2 className='animate-spin text-muted-foreground w-20 h-20' />
      </ClerkLoading>
    </div>
  );
}
