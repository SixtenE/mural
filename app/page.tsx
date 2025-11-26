"use client";

import { useState } from "react";
import Mural from "./components/Mural";
import Header from "./components/Header";
import ImageDisplay from "./components/ImageDisplay";

export default function Page() {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <main className="container mx-auto flex flex-col px-4">
      <Header />
      <div className="flex flex-col md:flex-row justify-between">
        <Mural
          setGeneratedImage={setGeneratedImage}
          setIsGenerating={setIsGenerating}
          isGenerating={isGenerating}
        />
        <ImageDisplay
          isGenerating={isGenerating}
          generatedImage={generatedImage}
        />
      </div>
    </main>
  );
}
