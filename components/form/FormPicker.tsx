'use client';

import { unsplash } from '@/lib/unsplash';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';

import Link from 'next/link';
import FormErrors from './FormErrors';
import { defaultImages } from '@/constants/images';
import { Skeleton } from '../ui/skeleton';

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

const FormPicker = ({ id, errors }: FormPickerProps) => {
  const { pending } = useFormStatus();
  const [images, setImages] =
    useState<Array<Record<string, any>>>(defaultImages);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ['317099'],
          count: 9,
        });

        if (result && result.response) {
          const newImages = result.response as Array<Record<string, any>>;
          setImages(newImages);
        } else {
          console.error('Failed to fetch images from Unsplash');
        }
      } catch (err) {
        console.error(err);
        setImages(defaultImages);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className='grid grid-cols-3 gap-2 mb-2'>
        <Skeleton className='aspect-video w-20' />
        <Skeleton className='aspect-video w-20' />
        <Skeleton className='aspect-video w-20' />
        <Skeleton className='aspect-video w-20' />
        <Skeleton className='aspect-video w-20' />
        <Skeleton className='aspect-video w-20' />
        <Skeleton className='aspect-video w-20' />
        <Skeleton className='aspect-video w-20' />
        <Skeleton className='aspect-video w-20' />
      </div>
    );
  }

  return (
    <div className='relative'>
      <div className='grid grid-cols-3 gap-2 mb-2'>
        {images.map((image) => (
          <div
            className={cn(
              'cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted w-20',
              pending && 'opacity-50 hover:opacity-50 cursor-auto'
            )}
            key={image.id}
            onClick={() => {
              if (pending) return;
              setSelectedImageId(image.id);
            }}
          >
            <input
              type='radio'
              id={id}
              name={id}
              className='hidden'
              checked={selectedImageId === image.id}
              disabled={pending}
              value={image.urls.thumb}
              readOnly
            />
            <Image
              src={image.urls.thumb}
              alt={'Unsplash image'}
              className='object-cover rounded-sm'
              fill
            />
            {selectedImageId === image.id && (
              <div className='absolute inset-0 flex items-center justify-center h-full w-full bg-black/30'>
                <Check className='h-4 w-4 text-white' />
              </div>
            )}
            <Link
              href={image.links.html}
              target='_blank'
              className='opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline px-1 bg-black/50'
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors id='image' errors={errors} />
    </div>
  );
};

export default FormPicker;
