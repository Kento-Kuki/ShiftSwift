import { Separator } from '@/components/ui/separator';
import { db } from '@/lib/db';
import { notFound } from 'next/navigation';
import ShiftCard from './_components/ShiftCard';
import SiteHeader from './_components/SiteHeader';
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

  const shifts = await db.shift.findMany({
    where: {
      siteId: params.siteId,
    },
    include: {
      shiftAssignments: true,
    },
    orderBy: {
      date: 'asc',
    },
  });

  if (!site) notFound();
  return (
    <div className='w-full'>
      <SiteHeader site={site} />
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
