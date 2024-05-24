import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href='/'>
      <div className='hover:opacity-75 transition hidden md:block'>
        <Image
          src={'/logo.svg'}
          alt='ShiftSwift'
          height={60}
          width={150}
          style={{ objectFit: 'contain', maxWidth: '100%', height: 'auto' }}
        />
      </div>
    </Link>
  );
};
