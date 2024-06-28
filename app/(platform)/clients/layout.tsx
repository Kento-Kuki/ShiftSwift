import { db } from '@/lib/db';
import Sidebar from './_components/Sidebar';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import MobileSidebar from './_components/MobileSidebar';

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
    <main className='pt-16 md:px-4 w-full 2xl:max-w-screen-2xl mx-auto h-full'>
      <div className='flex md:gap-x-7 h-full'>
        <div className='w-64 shrink-0 hidden md:block'>
          <Sidebar clients={clients} />
        </div>
        <div className='w-12 mt-2 md:hidden bg-sky-700 text-primary-foreground border-slate-300 border rounded-r-xl shrink-0 flex justify-center items-center h-14 fixed top-28 z-10'>
          <MobileSidebar clients={clients} />
        </div>
        <div className='w-full h-full mx-4 md:mx-0'>{children}</div>
      </div>
    </main>
  );
};

export default ClientsLayout;
