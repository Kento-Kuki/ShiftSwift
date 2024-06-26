import { redirect } from 'next/navigation';
import SettingCard from './_components/SettingCard';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { Suspense } from 'react';

interface SettingCardProps {
  params: {
    clientId: string;
  };
}
const SettingsPage = async ({ params }: SettingCardProps) => {
  const { orgId } = auth();
  if (!orgId) return redirect('/select-org');

  const client = await db.client.findUnique({
    where: {
      id: params.clientId,
      orgId,
    },
  });

  if (!client) return redirect('/clients');

  return (
    <div className='w-full md:w-3/4 max-w-4xl mx-auto p-4 md:p-6 lg:p-8 mb-5'>
      <SettingCard client={client} />
    </div>
  );
};

export default SettingsPage;

// 'use client';
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
//   CardFooter,
// } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Label } from '@/components/ui/label';
// import { Separator } from '@/components/ui/separator';
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from '@/components/ui/alert-dialog';
// import Image from 'next/image';
// import { OctagonAlert, Upload } from 'lucide-react';
// import { useParams, useRouter } from 'next/navigation';
// import { useQuery, useQueryClient } from '@tanstack/react-query';

// import { ChangeEvent, useMemo, useRef, useState } from 'react';
// import { Skeleton } from '@/components/ui/skeleton';
// import { useAction } from '@/hooks/useAction';
// import { updateClient } from '@/actions/updateClient';
// import { toast } from 'sonner';
// import { FormInput } from '@/components/form/FormInput';
// import FormTextarea from '@/components/form/FormTextarea';
// import FormButton from '@/components/form/FormButton';
// import { deleteClient } from '@/actions/deleteClient';
// import { Client } from '@prisma/client';
// import { useOrganization } from '@clerk/nextjs';
// import { supabase } from '@/utils/supabase';

// const SettingsPage = () => {
//   const inputRef = useRef<HTMLInputElement>(null);
//   const { organization } = useOrganization();
//   const router = useRouter();
//   const params = useParams();
//   const queryClient = useQueryClient();

//   const { data: clients, isLoading } = useQuery<Client[]>({
//     queryKey: ['clients', organization?.id],
//     initialData: () => queryClient.getQueryData<Client[]>(['clients']),
//   });
//   const client = useMemo(() => {
//     return clients?.find((client) => client.id === params.clientId);
//   }, [clients, params.clientId]);

//   const [currentImage, setCurrentImage] = useState<string | undefined>(
//     client?.imageUrl
//   );

//   const { execute: updateExecute, fieldErrors } = useAction(updateClient, {
//     onSuccess: () => {
//       toast.success('Client updated');
//       queryClient.invalidateQueries({
//         queryKey: ['clients'],
//       });
//       router.refresh();
//     },
//     onError: () => {
//       toast.error('Failed to update client');
//     },
//   });

//   const { execute: deleteExecute } = useAction(deleteClient, {
//     onSuccess: () => {
//       toast.success(`${client?.name} deleted`);
//       queryClient.invalidateQueries({
//         queryKey: ['clients'],
//       });
//       router.push('/clients');
//     },
//     onError: () => {
//       toast.error('Failed to delete client');
//     },
//   });

//   // TODO: Add image upload
//   const onUpdate = (formData: FormData) => {
//     const id = params.clientId as string;
//     const name = formData.get('name') as string;
//     const address = formData.get('address') as string;
//     const phone = formData.get('phone') as string;
//     const email = formData.get('email') as string;
//     const imageUrl = currentImage!;

//     if (
//       name === client?.name &&
//       address === client?.address &&
//       phone === client?.phone &&
//       email === client?.email &&
//       imageUrl === client?.imageUrl
//     ) {
//       toast.error('No changes detected');
//       return;
//     }
//     updateExecute({ name, address, phone, email, imageUrl, id });
//   };

//   const onDelete = () => {
//     const id = params.clientId as string;
//     deleteExecute({ id });
//   };

//   const onChangeImage = async (
//     e: ChangeEvent<HTMLInputElement>
//   ): Promise<void> => {
//     try {
//       if (!e.target.files || e.target.files.length === 0) return;

//       const fileName = currentImage?.split('/').slice(-1)[0];
//       await supabase.storage
//         .from('client-image')
//         .remove([`${client?.id}/${fileName}`]);

//       const file = e.target.files[0];
//       const { error, data: pathData } = await supabase.storage
//         .from('client-image')
//         .upload(`${client?.id}/${file.name}`, file);
//       if (error) {
//         toast.error(error.message);
//         return;
//       }

//       const { data } = await supabase.storage
//         .from('client-image')
//         .getPublicUrl(pathData.path);

//       setCurrentImage(data.publicUrl);
//     } catch (error) {
//       toast.error(error as string);
//     }
//   };

//   if (isLoading) {
//     return <SettingsPage.Skeleton />;
//   }

//   return (
//     <div className='w-full md:w-3/4 max-w-4xl mx-auto p-4 md:p-6 lg:p-8 mb-5'>
//       <Card className='px-6 py-3 max-w-3xl'>
//         <CardHeader className='px-0 md:px-6'>
//           <CardTitle>Client Profile</CardTitle>
//           <CardDescription>Update your client information.</CardDescription>
//         </CardHeader>
//         <CardContent className='p-0 md:px-6'>
//           <form className='flex flex-col gap-y-3 mb-4' action={onUpdate}>
//             <div className='flex items-center gap-10 justify-center md:justify-start'>
//               <Image
//                 id='image'
//                 src={currentImage! || client?.imageUrl!}
//                 width={100}
//                 height={100}
//                 alt='Client Icon'
//                 className='h-20 w-20 rounded-md'
//               />
//               <Button
//                 variant='outline'
//                 type='button'
//                 onClick={() => inputRef.current?.click()}
//               >
//                 <input
//                   type='file'
//                   hidden
//                   ref={inputRef}
//                   accept='image/*'
//                   onChange={onChangeImage}
//                 />
//                 <Upload className='md:mr-2 h-4 w-4' />
//                 <span className='hidden sm:inline'>Upload Photo</span>
//               </Button>
//             </div>
//             <FormInput
//               id='name'
//               label='Name'
//               type='text'
//               defaultValue={client?.name}
//               errors={fieldErrors}
//               placeholder='Enter a name for this client...'
//             />
//             <FormTextarea
//               id='address'
//               label='Address'
//               defaultValue={client?.address}
//               errors={fieldErrors}
//               placeholder='Enter a address for this client...'
//             />
//             <div className='space-y-3'>
//               <FormInput
//                 id='email'
//                 label='Email'
//                 type='email'
//                 defaultValue={client?.email}
//                 errors={fieldErrors}
//                 placeholder='Enter an email for this client...'
//               />
//               <FormInput
//                 id='phone'
//                 label='Phone'
//                 type='phone'
//                 defaultValue={client?.phone}
//                 errors={fieldErrors}
//                 placeholder='Enter a phone number for this client...'
//               />
//             </div>
//             <FormButton className='w-full md:w-fit md:ml-auto'>
//               Save Changes
//             </FormButton>
//           </form>
//           <Separator className='my-5' />
//         </CardContent>
//         <CardFooter className='p-3 md:flex block md:mx-6 justify-between bg-rose-50 mb-4 rounded-md border border-rose-300'>
//           <div className='mb-3 md:mb-0 flex gap-x-2 items-center'>
//             <OctagonAlert className='w-5 h-5 mr-2 text-red-500' />
//             <div>
//               <h3 className='text-lg font-medium'>Delete Client</h3>
//               <p className='text-sm text-gray-500 dark:text-gray-400'>
//                 This action cannot be undone.
//               </p>
//             </div>
//           </div>
//           <AlertDialog>
//             <AlertDialogTrigger asChild>
//               <Button className='w-full md:w-fit' variant='delete'>
//                 Delete Client
//               </Button>
//             </AlertDialogTrigger>
//             <AlertDialogContent>
//               <AlertDialogHeader>
//                 <AlertDialogTitle>Are you sure?</AlertDialogTitle>
//                 <AlertDialogDescription>
//                   This will permanently delete your client and all of your data.
//                 </AlertDialogDescription>
//               </AlertDialogHeader>
//               <AlertDialogFooter>
//                 <AlertDialogCancel>Cancel</AlertDialogCancel>
//                 <form action={onDelete}>
//                   <AlertDialogAction type='submit'>Confirm</AlertDialogAction>
//                 </form>
//               </AlertDialogFooter>
//             </AlertDialogContent>
//           </AlertDialog>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// SettingsPage.Skeleton = function SkeletonSettings() {
//   return (
//     <div className='w-3/4 max-w-4xl mx-auto p-4 md:p-6 lg:p-8 mb-5'>
//       <div className='grid gap-8'>
//         <Card className='px-6'>
//           <CardHeader>
//             <CardTitle>Client Profile</CardTitle>
//             <CardDescription>Update your client information.</CardDescription>
//           </CardHeader>
//           <CardContent className='grid gap-6'>
//             <div className='grid gap-4 gap-y-8'>
//               <div className='flex items-center gap-10'>
//                 <Skeleton className='h-20 w-20 rounded-md' />
//                 <Button variant='outline'>
//                   <Upload className='mr-2 h-4 w-4' />
//                   Upload Photo
//                 </Button>
//               </div>
//               <div className='grid gap-2'>
//                 <Label htmlFor='name'>Name</Label>
//                 <Skeleton className='h-10 w-full' />
//               </div>
//               <div className='grid gap-2'>
//                 <Label htmlFor='address'>Address</Label>
//                 <Skeleton className='h-20 w-full' />
//               </div>
//               <div className='grid grid-cols-2 gap-6'>
//                 <div className='grid gap-2'>
//                   <Label htmlFor='email'>Email</Label>
//                   <Skeleton className='h-10 w-full' />
//                 </div>
//                 <div className='grid gap-2'>
//                   <Label htmlFor='phone'>Phone</Label>
//                   <Skeleton className='h-10 w-full' />
//                 </div>
//               </div>
//             </div>
//             <div className='grid gap-2'>
//               <div className='flex items-center justify-between'>
//                 <div>
//                   <h3 className='text-lg font-semibold'>Delete Client</h3>
//                   <p className='text-sm text-gray-500 dark:text-gray-400'>
//                     This action cannot be undone.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </CardContent>
//           <CardFooter>
//             <Button>Save Changes</Button>
//           </CardFooter>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default SettingsPage;
