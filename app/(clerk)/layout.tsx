import Image from 'next/image';
import Link from 'next/link';

const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2 container'>
      <div className='h-full hidden lg:flex items-center justify-center '>
        <Link href='/' passHref className='hover:opacity-75 transition'>
          <Image
            src={'/images/logo_transparent.png'}
            width={500}
            height={500}
            alt={'logo'}
            priority
          />
        </Link>
      </div>
      {children}
    </div>
  );
};

export default ClerkLayout;
