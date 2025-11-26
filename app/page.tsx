"use client";

import { useState } from "react";
import Mural from "./components/Mural";
import Image from "next/image";

export default function Page() {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <main className="container mx-auto flex flex-col px-4">
      <header>
        <h1 className="font-mono p-4 text-2xl">mural</h1>
      </header>
      <div className="flex flex-col md:flex-row justify-between">
        <Mural
          setGeneratedImage={setGeneratedImage}
          setIsGenerating={setIsGenerating}
          isGenerating={isGenerating}
        />
        {isGenerating && !generatedImage && (
          <div className="w-xl aspect-square border border-black flex flex-col items-center justify-center animate-pulse">
            <p className="font-mono text-md">Generating...</p>
          </div>
        )}
        {!isGenerating && generatedImage && (
          <div className="w-xl aspect-square border border-black flex flex-col items-center justify-center">
            <Image
              src={`data:image/png;base64,${generatedImage}`}
              alt="Generated Mural"
              width={512}
              height={512}
            />
          </div>
        )}
      </div>
    </main>
  );
}
