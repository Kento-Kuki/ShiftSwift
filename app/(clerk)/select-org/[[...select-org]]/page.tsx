import { ClerkLoaded, ClerkLoading, OrganizationList } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CreateOrganizationPage() {
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
      <div className='flex justify-center items-center mt-8'>
        <ClerkLoaded>
          <OrganizationList
            hidePersonal
            afterSelectOrganizationUrl={'/organization/:id'}
            afterCreateOrganizationUrl={'/organization/:id'}
          />
        </ClerkLoaded>
        <ClerkLoading>
          <Loader2 className='animate-spin text-muted-foreground w-20 h-20' />
        </ClerkLoading>
      </div>
    </div>
  );
}
