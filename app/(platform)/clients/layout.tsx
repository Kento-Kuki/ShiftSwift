import { db } from '@/lib/db';
import Sidebar from './_components/Sidebar';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const ClientsLayout = async ({ children }: { children: React.ReactNode }) => {
  const { orgId } = auth();

  if (!orgId) return redirect('/select-org');
  const clients = await db.client.findMany({
    where: { orgId },
    orderBy: {
      createdAt: 'asc',
    },
  });
  return (
    <main className='pt-16 px-4 w-full 2xl:max-w-screen-2xl mx-auto h-full'>
      <div className='flex gap-x-7 h-full'>
        <div className='w-64 shrink-0 hidden md:block'>
          <Sidebar clients={clients} />
        </div>
        {children}
      </div>
    </main>
  );
};

export default ClientsLayout;
