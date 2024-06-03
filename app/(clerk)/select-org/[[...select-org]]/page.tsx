import { ClerkLoaded, ClerkLoading, OrganizationList } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';

export default function CreateOrganizationPage() {
  return (
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
  );
}
