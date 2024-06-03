'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';

interface FormButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'primary';
}
const FormButton = ({
  children,
  disabled,
  className,
  variant = 'primary',
}: FormButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={disabled || pending}
      className={className}
      variant={variant}
      type='submit'
    >
      {children}
    </Button>
  );
};

export default FormButton;
