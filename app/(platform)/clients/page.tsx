import Image from 'next/image';

const ClientPage = () => {
  return (
    <div className='flex justify-center items-center h-full flex-col w-full'>
      <div className='text-center mb-5'>
        <h2 className='text-3xl font-bold mb-2'>
          Select a client to get started!
        </h2>
        <p className='text-lg'>Add, search, and manage clients to begin.</p>
      </div>
      <Image
        src={'/images/rafiki.png'}
        width={500}
        height={500}
        alt={'Lets get started'}
      />
    </div>
  );
};

export default ClientPage;
