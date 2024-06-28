import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Client, Site } from '@prisma/client';
import Info from '../../_components/Info';
import { Button } from '@/components/ui/button';
import FormShiftPopover from './FormShiftPopover';
import { Plus } from 'lucide-react';

interface SiteHeaderProps {
  site: Site;
  client: Client;
}

const SiteHeader = ({ site, client }: SiteHeaderProps) => {
  return (
    <div className='flex justify-between items-center my-2 mx-1'>
      <Breadcrumb>
        <BreadcrumbList className='text-black font-bold text-lg '>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/clients/${site.clientId}/sites`}>
              <Info client={client} />
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className='hover:opacity-75'>
            <BreadcrumbLink>{site.name}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <FormShiftPopover side='left' align='start' sideOffset={10}>
        <Button variant={'primary'} size={'sm'}>
          <span className='hidden md:inline'>Add New Shift</span>
          <span className='inline md:hidden'>
            <Plus className='w-4 h-4' />
          </span>
        </Button>
      </FormShiftPopover>
    </div>
  );
};

export default SiteHeader;
