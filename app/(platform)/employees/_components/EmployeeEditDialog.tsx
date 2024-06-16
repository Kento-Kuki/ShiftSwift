'use client';

import { updateEmployee } from '@/actions/updateEmployee';
import FormButton from '@/components/form/FormButton';
import { FormInput } from '@/components/form/FormInput';
import { FormSelect } from '@/components/form/FormSelect';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { skillOptions } from '@/constants/selectOptions';
import { useAction } from '@/hooks/useAction';
import { Employee } from '@prisma/client';
import { ElementRef, useRef } from 'react';
import { toast } from 'sonner';

interface EmployeeEditModalProps {
  children: React.ReactNode;
  employee: Employee;
}

const EmployeeEditModal = ({ children, employee }: EmployeeEditModalProps) => {
  const closeRef = useRef<ElementRef<'button'>>(null);
  const { execute, fieldErrors } = useAction(updateEmployee, {
    onSuccess: () => {
      toast.success('Employee updated');
      closeRef.current?.click();
    },
    onError: () => {
      toast.error('Failed to update Employee');
    },
  });

  const onSubmit = (formData: FormData) => {
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const skills = formData.getAll('skills') as string[];
    execute({ name, phone, email, skills, id: employee.id });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <form action={onSubmit} className='flex flex-col gap-4'>
          <FormInput
            id='name'
            label='Name'
            type='text'
            placeholder='Name'
            defaultValue={employee.name}
            errors={fieldErrors}
          />
          <FormInput
            id='phone'
            label='Phone'
            type='text'
            placeholder='Phone'
            defaultValue={employee.phone}
            errors={fieldErrors}
          />
          <FormInput
            id='email'
            label='Email'
            type='text'
            placeholder='email'
            defaultValue={employee.email}
            errors={fieldErrors}
          />
          <FormSelect
            id='skills'
            label='Skills'
            options={skillOptions}
            isMulti
            defaultValue={employee.skills.map((skill) => ({
              label: skill,
              value: skill,
            }))}
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

export default EmployeeEditModal;
