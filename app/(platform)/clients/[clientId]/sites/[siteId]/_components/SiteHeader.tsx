import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Info from '../../_components/Info';
import FormShiftPopover from './FormShiftPopover';
import { Site } from '@prisma/client';

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
