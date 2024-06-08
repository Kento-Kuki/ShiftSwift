import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Site } from '@prisma/client';

import SiteEditModal from './SiteEditModal';
import SiteAlertDialog from './SiteAlertDialog';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

interface SiteCardProps {
  site: Site;
}

export const SiteCard = ({ site }: SiteCardProps) => {
  return (
    <Card className='px-2'>
      <CardHeader className='p-3'>
        <h2 className='text-xl font-medium text-center'>{site.name}</h2>
      </CardHeader>
      <CardContent>
        <div className='space-y-2'>
          <div className=''>
            <h3 className='text-sm text-gray-500 dark:text-gray-400'>
              Location
            </h3>
            <p className='text-base font-medium pl-1'>{site.location}</p>
          </div>
          <div className='space-y-1'>
            <h3 className='text-sm text-gray-500 dark:text-gray-400'>
              Requirements
            </h3>
            <div className='flex flex-wrap gap-2'>
              {site.requirements.length > 0 ? (
                site.requirements.map((requirement) => (
                  <Badge variant={'secondary'} key={requirement}>
                    {requirement}
                  </Badge>
                ))
              ) : (
                <span className=' text-xs font-medium text-gray-800 pl-1'>
                  No requirements
                </span>
              )}
            </div>
          </div>
          <div className='space-y-1'>
            <h3 className='text-sm text-gray-500 dark:text-gray-400'>
              Description
            </h3>
            <div className='bg-slate-100 rounded-lg p-2 min-h-20'>
              <p className=' text-xs font-medium'>
                {site.description || 'No description'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex justify-between gap-x-4 pb-4 items-center'>
        <Button size={'sm'} variant={'primary'}>
          <Link href={`/clients/${site.clientId}/sites/${site.id}`}>
            Shifts
          </Link>
        </Button>
        <div className='flex gap-x-2'>
          <SiteEditModal site={site}>
            <Button variant='outline' size='sm'>
              Edit
            </Button>
          </SiteEditModal>
          <SiteAlertDialog id={site.id} clientId={site.clientId}>
            <Button variant={'delete'} size='sm'>
              Delete
            </Button>
          </SiteAlertDialog>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SiteCard;
