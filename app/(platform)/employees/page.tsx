import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import EmployeesList from './_components/EmployeesList';

const EmployeesPage = async () => {
  const { orgId } = auth();

  if (!orgId) return redirect('/select-org');
  const employees = await db.employee.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
  return (
    <main className='container pt-20'>
      <div className='flex gap-2 justify-between items-center'>
        <h1 className='text-2xl font-bold'>Employees</h1>
        <div>
          <Input placeholder='Search' />
        </div>
      </div>
      <EmployeesList employees={employees} />
    </main>
  );
};

export default EmployeesPage;
