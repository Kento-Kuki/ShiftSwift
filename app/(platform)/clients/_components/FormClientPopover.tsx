'use client';

import { X } from 'lucide-react';
import { FormInput } from '@/components/form/FormInput';
import FormButton from '@/components/form/FormButton';
import { useAction } from '@/hooks/useAction';
import { createClient } from '@/actions/createClient';
import { toast } from 'sonner';
import { ElementRef, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import FormPicker from '@/components/form/FormPicker';
import { useQueryClient } from '@tanstack/react-query';

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
  const queryClient = useQueryClient();
  const { execute, fieldErrors } = useAction(createClient, {
    onSuccess: (data) => {
      toast.success('Client created');
      closeRef.current?.click();
      queryClient.invalidateQueries({
        queryKey: ['clients'],
      });
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
    const image = formData.get('image') as string;
    execute({ name, address, phone, email, image });
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
            <p className='text-sm font-bold  text-neutral-600'>
              Add new client
            </p>
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
        <form action={onSubmit} className='space-y-4 mt-8'>
          <div>
            <FormPicker id='image' errors={fieldErrors} />
            <FormInput
              id='name'
              label='Name'
              type='text'
              errors={fieldErrors}
            />
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
          </div>
          <FormButton className='w-full'>Add</FormButton>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default FormClientPopover;
