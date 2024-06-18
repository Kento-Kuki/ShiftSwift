'use client';

import { toast } from 'sonner';
import { X } from 'lucide-react';
import { useParams } from 'next/navigation';
import { ElementRef, useRef, useState } from 'react';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from '@/components/ui/popover';
import { Option } from '@/types';
import { useAction } from '@/hooks/useAction';
import { Button } from '@/components/ui/button';
import { createSite } from '@/actions/createSite';
import FormButton from '@/components/form/FormButton';
import { FormInput } from '@/components/form/FormInput';
import { skillOptions } from '@/constants/selectOptions';
import FormTextarea from '@/components/form/FormTextarea';
import { FormSelect } from '@/components/form/FormSelect';

interface FormPopoverProps {
  children: React.ReactNode;
  side?: 'left' | 'right' | 'top' | 'bottom';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
}

const FormSitePopover = ({
  children,
  side = 'right',
  align = 'center',
  sideOffset = 10,
}: FormPopoverProps) => {
  const [requirements, setRequirements] = useState<Option | Option[] | null>(
    null
  );
  const params = useParams();
  const closeRef = useRef<ElementRef<'button'>>(null);
  const { execute, fieldErrors } = useAction(createSite, {
    onSuccess: () => {
      toast.success('Site created successfully');
      closeRef.current?.click();
    },
    onError: () => {
      toast.error('Failed to create site');
    },
  });

  const onSubmit = (formData: FormData) => {
    const name = formData.get('name') as string;
    const location = formData.get('location') as string;
    const requirements = formData.getAll('requirements') as string[];
    const description = formData.get('description') as string;
    execute({
      name,
      location,
      requirements,
      description,
      clientId: params.clientId as string,
    });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        side={side}
        align={align}
        sideOffset={sideOffset}
        className=' p-6 space-y-4'
      >
        <div className='fixed top-0 left-0 right-0 h-10 bg-white/95 z-10 flex items-center py-2'>
          <div className=' h-full relative w-full flex items-center justify-center'>
            <h2 className='text-lg font-bold  text-neutral-700'>
              Add new site
            </h2>
            <PopoverClose ref={closeRef} asChild>
              <Button
                className='h-auto w-auto p-1 absolute right-2 top-0 text-neutral-600'
                variant='ghost'
              >
                <X className='h-4 w-4' />
              </Button>
            </PopoverClose>
          </div>
        </div>
        <form action={onSubmit} className='space-y-3'>
          <FormInput
            id='name'
            label='Name'
            type='text'
            placeholder='Name'
            errors={fieldErrors}
          />
          <FormInput
            id='location'
            label='Location'
            type='text'
            placeholder='Location'
            errors={fieldErrors}
          />
          <FormSelect
            id='requirements'
            label='Requirements'
            placeholder='Add requirements'
            options={skillOptions}
            selectedOption={requirements}
            setSelectedOption={setRequirements}
            isMulti
            errors={fieldErrors}
          />
          <FormTextarea
            id='description'
            label='Description'
            placeholder='Description'
            errors={fieldErrors}
          />
          <FormButton className='w-full'>Add</FormButton>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default FormSitePopover;
