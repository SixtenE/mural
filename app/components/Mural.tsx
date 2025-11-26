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

    const images = new FormData();
    const artResponse = await fetch(selectedArt);
    const artBlob = await artResponse.blob();
    const artFile = new File(
      [artBlob],
      selectedArt.split("/").pop() || "art.webp",
      { type: artBlob.type }
    );

    const buildingResponse = await fetch(selectedBuilding);
    const buildingBlob = await buildingResponse.blob();
    const buildingFile = new File(
      [buildingBlob],
      selectedBuilding.split("/").pop() || "building.png",
      { type: buildingBlob.type }
    );

    images.append("image1", artFile);
    images.append("image2", buildingFile);

    const result = await fetch("/api/generate", {
      method: "POST",
      body: images,
    });

    const data = await result.json();
    console.log(data);

    setGeneratedImage(data.image.b64_json);
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
