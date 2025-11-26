"use client";

import Image from "next/image";

interface ImageDisplayProps {
  isGenerating: boolean;
  generatedImage: string | null;
}

export default function ImageDisplay({
  isGenerating,
  generatedImage,
}: ImageDisplayProps) {
  if (isGenerating && !generatedImage) {
    return (
      <div className=" w-full sm:w-xl aspect-square border border-black flex flex-col items-center justify-center animate-pulse">
        <p className="font-mono text-md">Generating...</p>
      </div>
    );
  }

  if (!isGenerating && generatedImage) {
    return (
      <div className="w-xl aspect-square border border-black flex flex-col items-center justify-center">
        <Image
          src={generatedImage}
          alt="Generated Mural"
          width={512}
          height={512}
        />
      </div>
    );
  }

  return null;
}
