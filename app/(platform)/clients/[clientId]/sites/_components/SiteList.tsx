import { db } from '@/lib/db';
import SiteCard from './SiteCard';

interface SiteListProps {
  clientId: string;
}

const SiteList = async ({ clientId }: SiteListProps) => {
  const sites = await db.site.findMany({
    where: {
      clientId,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 m-2 my-5'>
      {sites.map((site) => (
        <SiteCard key={site.id} site={site} />
      ))}
    </div>
  );
};

export default SiteList;
