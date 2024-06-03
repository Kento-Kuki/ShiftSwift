import React from 'react';
import Navbar from './_components/Navbar';
import { Toaster } from 'sonner';
import QueryProvider from '@/components/providers/QueryProvider';

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <Toaster />
      <div className='h-full'>
        <Navbar />
        {children}
      </div>
    </QueryProvider>
  );
};

export default PlatformLayout;
