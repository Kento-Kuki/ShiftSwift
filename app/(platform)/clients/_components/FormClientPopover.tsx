'use client';

import { toast } from 'sonner';
import { X } from 'lucide-react';
import { ElementRef, useRef } from 'react';
import { useRouter } from 'next/navigation';

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAction } from '@/hooks/useAction';
import { Button } from '@/components/ui/button';
import FormButton from '@/components/form/FormButton';
import { createClient } from '@/actions/createClient';
import FormPicker from '@/components/form/FormPicker';
import { FormInput } from '@/components/form/FormInput';

interface FormPopoverProps {
  children: React.ReactNode;
  side?: 'left' | 'right' | 'top' | 'bottom';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
}

const FormClientPopover = ({
  children,
  side = 'right',
  align = 'center',
  sideOffset = 10,
}: FormPopoverProps) => {
  const closeRef = useRef<ElementRef<'button'>>(null);
  const router = useRouter();

  // Server Action
  const { execute, fieldErrors } = useAction(createClient, {
    onSuccess: (data) => {
      toast.success('Client created');
      closeRef.current?.click();
      router.push(`/clients/${data.id}/sites`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const name = formData.get('name') as string;
    const address = formData.get('address') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const imageUrl = formData.get('image') as string;
    execute({ name, address, phone, email, imageUrl });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className='pt-3 overflow-auto'
        side={side}
        sideOffset={sideOffset}
      >
        <div className='fixed top-0 left-0 right-0 h-10 bg-white/95 z-10 flex items-center py-2'>
          <div className=' h-full relative w-full flex items-center justify-center'>
            <h2 className='text-lg font-bold  text-neutral-700'>
              Add new client
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
        <form action={onSubmit} className='space-y-3 mt-8'>
          <FormPicker id='image' errors={fieldErrors} />
          <FormInput id='name' label='Name' type='text' errors={fieldErrors} />
          <FormInput
            id='address'
            label='Address'
            type='text'
            errors={fieldErrors}
          />
          <FormInput
            id='phone'
            label='Phone'
            type='phone'
            errors={fieldErrors}
          />
          <FormInput
            id='email'
            label='Email'
            type='email'
            errors={fieldErrors}
          />
          <FormButton className='w-full'>Add</FormButton>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default FormClientPopover;
