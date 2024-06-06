import Info from './_components/Info';
import { Separator } from '@/components/ui/separator';
import FormSitePopover from './_components/FormSitePopover';
import { Button } from '@/components/ui/button';
import SiteList from './_components/SiteList';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';

const SitesPage = async ({ params }: { params: { clientId: string } }) => {
  const client = await db.client.findUnique({
    where: {
      id: params.clientId,
    },
  });

  if (!client) notFound();

  return (
    <div className='w-full'>
      <div className='flex justify-between items-center my-2 mx-1'>
        <Info />
        <FormSitePopover side='bottom' align='end' sideOffset={10}>
          <Button variant={'primary'} size={'sm'}>
            Add New Site
          </Button>
        </FormSitePopover>
      </div>
      <Separator className='w-full ' />
      <div>
        <SiteList clientId={client.id} />
      </div>
    </div>
  );
};

export default SitesPage;
