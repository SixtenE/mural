"use client";

import { useState } from "react";
import ImageSelector from "./ImageSelector";
import GenerateButton from "./GenerateButton";
import { muralArt, muralBuildings } from "../constants/images";

interface PageProps {
  setGeneratedImage: (image: string | null) => void;
  setIsGenerating: (generating: boolean) => void;
  isGenerating: boolean;
}

export default function Page({
  setGeneratedImage,
  setIsGenerating,
  isGenerating,
}: PageProps) {
  const [selectedArt, setSelectedArt] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState("");

  async function generate() {
    if (selectedArt === "" || selectedBuilding === "") return;

    setIsGenerating(true);
    setGeneratedImage(null);

    const result = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({
        art: selectedArt,
        building: selectedBuilding,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await result.json();
    console.log(data);

    setGeneratedImage(data.result);
    setIsGenerating(false);
  }

  return (
    <div className="w-xl aspect-square border border-black flex flex-col">
      <ImageSelector
        title="Pick an artwork"
        images={muralArt}
        selectedImage={selectedArt}
        onSelect={setSelectedArt}
      />
      <ImageSelector
        title="Pick a building"
        images={muralBuildings}
        selectedImage={selectedBuilding}
        onSelect={setSelectedBuilding}
      />
      <GenerateButton
        onClick={generate}
        disabled={selectedArt === "" || selectedBuilding === "" || isGenerating}
      />
    </div>
  );
}
