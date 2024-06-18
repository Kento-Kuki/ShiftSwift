import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Site } from '@prisma/client';
import Info from '../../_components/Info';
import { Button } from '@/components/ui/button';
import FormShiftPopover from './FormShiftPopover';

interface SiteHeaderProps {
  site: Site;
}

const SiteHeader = ({ site }: SiteHeaderProps) => {
  return (
    <div className='flex justify-between items-center my-2 mx-1'>
      <Breadcrumb>
        <BreadcrumbList className='text-black font-bold text-lg '>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/clients/${site.clientId}/sites`}>
              <Info />
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
          Add New Shift
        </Button>
      </FormShiftPopover>
    </div>
  );
};

export default SiteHeader;
