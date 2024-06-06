import React from 'react';
import Sidebar from './_components/Sidebar';

const ClientsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='pt-16 px-4 w-full 2xl:max-w-screen-2xl mx-auto h-full'>
      <div className='flex gap-x-7 h-full'>
        <div className='w-64 shrink-0 hidden md:block'>
          <Sidebar />
        </div>
        {children}
      </div>
    </main>
  );
};

export default ClientsLayout;
