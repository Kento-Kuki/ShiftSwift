'use client';
import { toast } from 'sonner';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useAction } from '@/hooks/useAction';
import { deleteEmployee } from '@/actions/deleteEmployee';

interface EmployeeAlertDialogProps {
  id: string;
  children: React.ReactNode;
}

const EmployeeAlertDialog = ({ children, id }: EmployeeAlertDialogProps) => {
  const { execute } = useAction(deleteEmployee, {
    onSuccess: () => {
      toast.success('Employee deleted');
    },
    onError: () => {
      toast.error('Failed to delete employee');
    },
  });

  const onDelete = () => {
    execute({ id });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the employee data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={onDelete}>
            <AlertDialogAction type='submit'>Confirm</AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EmployeeAlertDialog;
