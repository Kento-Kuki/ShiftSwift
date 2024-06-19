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
import { deleteShift } from '@/actions/deleteShift';

interface ShiftAlertDialogProps {
  id: string;
  clientId: string;
  siteId: string;
  children: React.ReactNode;
}

const ShiftAlertDialog = ({
  children,
  id,
  clientId,
  siteId,
}: ShiftAlertDialogProps) => {
  const { execute } = useAction(deleteShift, {
    onSuccess: () => {
      toast.success('Shift deleted');
    },
    onError: () => {
      toast.error('Failed to delete shift');
    },
  });
  const onDelete = () => {
    execute({ id, clientId, siteId });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this shift.
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

export default ShiftAlertDialog;
