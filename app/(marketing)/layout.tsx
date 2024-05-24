import React from 'react';
import { Navbar } from './_components/Navbar';
import { Footer } from './_components/Footer';

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-screen flex flex-col'>
      <Navbar />
      <main className='pt-32 pb-28 flex-1 flex items-center justify-center'>
        <div className='container'>{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
