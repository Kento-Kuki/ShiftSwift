'use client';
import { toast } from 'sonner';
import { Site } from '@prisma/client';
import { ElementRef, useRef, useState } from 'react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Option } from '@/types';
import { useAction } from '@/hooks/useAction';
import { Button } from '@/components/ui/button';
import { updateSite } from '@/actions/updateSite';
import FormButton from '@/components/form/FormButton';
import { FormInput } from '@/components/form/FormInput';
import { skillOptions } from '@/constants/selectOptions';
import { FormSelect } from '@/components/form/FormSelect';
import FormTextarea from '@/components/form/FormTextarea';

interface SiteEditModalProps {
  children: React.ReactNode;
  site: Site;
}

const SiteEditModal = ({ children, site }: SiteEditModalProps) => {
  const selectedOptions = site.requirements.map((req) => ({
    value: req,
    label: req,
  }));
  const [requirements, setRequirements] = useState<Option | Option[] | null>(
    selectedOptions
  );
  const closeRef = useRef<ElementRef<'button'>>(null);

  const { execute, fieldErrors } = useAction(updateSite, {
    onSuccess: () => {
      toast.success('Site updated');
      closeRef.current?.click();
    },
    onError: () => {
      toast.error('Failed to update site');
    },
  });

  const onSubmit = (formData: FormData) => {
    const name = formData.get('name') as string;
    const location = formData.get('location') as string;
    const requirements = formData.getAll('requirements') as string[];
    const description = formData.get('description') as string;

    if (
      name === site.name &&
      location === site.location &&
      JSON.stringify(requirements) === JSON.stringify(site.requirements) &&
      description === site.description
    ) {
      toast.error('No changes detected');
      return;
    }

    execute({
      name,
      location,
      requirements,
      description,
      clientId: site.clientId,
      id: site.id,
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <form action={onSubmit} className='space-y-3'>
          <FormInput
            id='name'
            label='Name'
            type='text'
            placeholder='Name'
            defaultValue={site.name}
            errors={fieldErrors}
          />
          <FormInput
            id='location'
            label='Location'
            type='text'
            placeholder='Location'
            defaultValue={site.location}
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
            defaultValue={site.description as string}
            errors={fieldErrors}
          />
          <DialogFooter>
            <FormButton>Save</FormButton>
            <DialogClose ref={closeRef} asChild>
              <Button variant='outline' type='button'>
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SiteEditModal;
