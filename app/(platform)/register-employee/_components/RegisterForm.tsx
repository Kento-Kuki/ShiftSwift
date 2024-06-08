'use client';
import { createEmployee } from '@/actions/createEmployee';
import FormButton from '@/components/form/FormButton';
import { FormInput } from '@/components/form/FormInput';
import { FormSelect } from '@/components/form/FormSelect';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { skillOptions } from '@/constants/skills';
import { useAction } from '@/hooks/useAction';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const RegisterForm = () => {
  const router = useRouter();
  const { user } = useUser();
  const { execute, fieldErrors } = useAction(createEmployee, {
    onSuccess: () => {
      toast.success('Employee registered successfully');
      router.push('/clients');
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const skills = formData.getAll('skills') as string[];
    const imageUrl = user?.imageUrl as string;
    execute({ name, email, phone, skills, imageUrl });
  };
  return (
    <Card className='px-2 md:px-6 w-[300px] md:w-full max-w-xl'>
      <CardHeader className='p-3'>
        <h3 className='text-xl font-bold text-center'>Register Form</h3>
      </CardHeader>
      <CardContent>
        <form action={onSubmit} className='flex flex-col gap-4'>
          <FormInput
            id='name'
            label='Name'
            type='text'
            placeholder='Name'
            errors={fieldErrors}
            defaultValue={user?.fullName || ''}
          />
          <FormInput
            id='email'
            label='Email'
            type='text'
            placeholder='email'
            errors={fieldErrors}
            defaultValue={user?.emailAddresses[0]?.emailAddress || ''}
          />
          <FormInput
            id='phone'
            label='Phone'
            type='text'
            placeholder='Phone'
            errors={fieldErrors}
            defaultValue={user?.phoneNumbers[0]?.phoneNumber || ''}
          />
          <FormSelect
            id='skills'
            label='Skills'
            options={skillOptions}
            isMulti
            errors={fieldErrors}
          />
          <FormButton className='w-full mt-3'>Register</FormButton>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
