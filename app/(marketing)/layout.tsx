import React from 'react';
import { Navbar } from './_components/Navbar';
import { Footer } from './_components/Footer';

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-full'>
      <Navbar />
      <main className='pt-32 pb-28 container'>{children}</main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
