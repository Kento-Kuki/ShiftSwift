import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link href='/'>
      <div className='hover:opacity-75 transition'>
        <Image
          src={'/logo.svg'}
          alt='ShiftSwift'
          height={40}
          width={100}
          style={{ objectFit: 'contain', maxWidth: '100%', height: 'auto' }}
        />
      </div>
    </Link>
  );
};
