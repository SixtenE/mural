"use client";

import Image from "next/image";

interface ImageSelectorProps {
  title: string;
  images: string[];
  selectedImage: string;
  onSelect: (image: string) => void;
}

export default function ImageSelector({
  title,
  images,
  selectedImage,
  onSelect,
}: ImageSelectorProps) {
  return (
    <>
      <p className="font-mono text-md text-center">{title}</p>
      <ul className="w-full h-1/3 flex border-y border-black bg-black">
        {images.map((image, index) => (
          <li
            className={
              "w-1/3 hover:opacity-90 p-0 transition-all" +
              (selectedImage === image ? " p-1" : "")
            }
            key={image}
            onClick={() => onSelect(image)}
          >
            <Image
              src={image}
              alt={`${title} ${index + 1}`}
              width={200}
              height={200}
              className={
                "object-cover w-full h-full border-black" +
                (index === 0 ? "" : " border-l")
              }
            />
          </li>
        ))}
      </ul>
    </>
  );
}
