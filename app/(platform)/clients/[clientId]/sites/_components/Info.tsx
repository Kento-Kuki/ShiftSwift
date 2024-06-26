import Image from 'next/image';
import { Client } from '@prisma/client';

const Info = ({ client }: { client: Client }) => {
  return (
    <div className='flex items-center gap-x-4'>
      <div className='w-[40px] h-[40px] relative'>
        <Image
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          src={client?.imageUrl!}
          alt='Client Icon'
          className='rounded-md object-cover'
        />
      </div>
      <p className='font-semibold text-xl hover:opacity-75'>{client?.name}</p>
    </div>
  );
};

export default Info;
