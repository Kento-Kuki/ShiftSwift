import { Button } from '@/components/ui/button';
import Info from '../_components/Info';
import { Separator } from '@/components/ui/separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
const SiteIdPage = async ({
  params,
}: {
  params: { siteId: string; clientId: string };
}) => {
  const site = await db.site.findUnique({
    where: {
      id: params.siteId,
      clientId: params.clientId,
    },
  });

  if (!site) notFound();
  return (
    <div className='w-full'>
      <div className='flex justify-between items-center my-2 mx-1'>
        <Breadcrumb>
          <BreadcrumbList className='text-black font-bold text-lg '>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/clients/${site.clientId}/sites`}>
                <Info />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className='hover:opacity-75'>
              <BreadcrumbLink>{site.name}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button variant={'primary'} size={'sm'}>
          Add New Site
        </Button>
      </div>
      <Separator className='w-full ' />
    </div>
  );
};

export default SiteIdPage;
