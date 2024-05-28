"use client";

import { Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

import Image from "next/image";

import type { Random } from "unsplash-js/dist/methods/photos/types";

import { unsplash } from "~/lib/unsplash";
import { cn } from "~/lib/utils";

import { defaultImages } from "constants/images";
import Link from "next/link";
import { FormErrors } from "./form-errors";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export const FormPicker = ({ id, errors }: FormPickerProps) => {
  const { pending } = useFormStatus();

  const [images, setImages] = useState<Random[]>(defaultImages);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    const fetchImages = async () => {
      try {
        throw new Error("Random images not added in development"); // TODO

        const result = await unsplash.photos.getRandom({
          //   collectionIds: ["1263731"],
          collectionIds: ["317099"],
          count: 9,
        });

        if (result?.response) {
          const newImages = result.response as Random[];
          setImages(newImages);
        } else {
          console.log("Failed to get images from Unsplash");
        }
      } catch (error) {
        console.log(error);
        setImages(defaultImages);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <Loader2 className="text-sly-700 h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="mb-2 grid grid-cols-3 gap-2">
        {images.map((image) => {
          return (
            <div
              key={image.id}
              className={cn(
                "group relative aspect-video cursor-pointer bg-muted transition hover:opacity-75",
                pending && "cursor-auto opacity-50",
              )}
              onClick={() => {
                if (pending) return;
                setSelectedImage(image.id);
              }}
            >
              <input
                id={id}
                name={id}
                type="radio"
                className="hidden"
                checked={selectedImage === image.id}
                disabled={pending}
                value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
                onChange={() => {1}}
              />
              <Image
                src={image.urls.thumb}
                className="rounded-sm object-cover"
                sizes="100%"
                fill
                alt="unsplash image"
              />
              {selectedImage === image.id && (
                <div className="absolute inset-y-0 flex h-full w-full items-center justify-center bg-black/30">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}
              {/* <Link
                href={image.links.html}
                target="_blank"
                className="absolute bottom-0 w-full truncate bg-black/40 p-1 text-[10px] text-white opacity-0 hover:underline group-hover:opacity-100"
              >
                {image.user.name}
              </Link> */}
            </div>
          );
        })}
      </div>
      <FormErrors id="image" errors={errors} />
    </div>
  );
};
