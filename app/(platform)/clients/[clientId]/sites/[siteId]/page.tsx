import { notFound } from 'next/navigation';

import { db } from '@/lib/db';
import ShiftCard from './_components/ShiftCard';
import SiteHeader from './_components/SiteHeader';
import { Separator } from '@/components/ui/separator';

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
    include: {
      client: true,
    },
  });

  const shifts = await db.shift.findMany({
    where: {
      siteId: params.siteId,
    },
    include: {
      shiftAssignments: true,
    },
    orderBy: {
      startTime: 'asc',
    },
  });

  if (!site) notFound();
  return (
    <div className='w-full'>
      <SiteHeader site={site} client={site.client} />
      <Separator className='w-full ' />
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 m-2 my-5'>
        {shifts.map((shift) => (
          <ShiftCard key={shift.id} shift={shift} clientId={params.clientId} />
        ))}
      </div>
    </div>
  );
};

export default SiteIdPage;
