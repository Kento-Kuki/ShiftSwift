import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

import { db } from '@/lib/db';
import RegisterForm from './_components/RegisterForm';

const RegisterEmployeePage = async () => {
  const { userId, orgId, orgSlug } = auth();

  if (!userId) return redirect('/sign-in');
  if (!orgId) return redirect('/select-org');

  const employee = await db.employee.findFirst({
    where: {
      userId,
      orgId,
    },
  });

  if (employee) {
    return redirect(`/clients?error=You've already registered as an employee`);
  }
  return (
    <div className='pt-14 flex flex-col gap-8 h-full w-full justify-center items-center'>
      <div className='flex flex-col gap-4 text-center'>
        <h1 className='text-2xl md:text-4xl font-bold'>
          Welcome to {orgSlug}!
        </h1>
        <p className='text-sm md:text-lg font-medium'>
          Let&apos;ts start by filling out your information.
        </p>
      </div>
      <RegisterForm />
    </div>
  );
};

export default RegisterEmployeePage;
