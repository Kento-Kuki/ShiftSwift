'use client';
import { deleteSite } from '@/actions/deleteSite';
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
import React from 'react';
import { toast } from 'sonner';

interface SiteAlertDialogProps {
  id: string;
  clientId: string;
  children: React.ReactNode;
}

const SiteAlertDialog = ({ children, id, clientId }: SiteAlertDialogProps) => {
  const { execute } = useAction(deleteSite, {
    onSuccess: () => {
      toast.success('Site deleted');
    },
    onError: () => {
      toast.error('Failed to delete site');
    },
  });
  const onDelete = () => {
    execute({ id, clientId });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this site data.
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

export default SiteAlertDialog;
