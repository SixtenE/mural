"use client";

import Image from "next/image";
import { useState } from "react";

const muralArt = [
  "/images/batescopsa_1080x.webp",
  "/images/hanif2_1512x.webp",
  "/images/juiced_1512x.webp",
];

const muralBuildings = [
  "/images/building_1.png",
  "/images/building_2.png",
  "/images/building_3.png",
];

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
      <p className="font-mono text-md text-center">Pick an artwork</p>
      <ul className="w-full h-1/3 flex border-y border-black bg-black">
        {muralArt.map((art, index) => (
          <li
            className={
              "w-1/3 hover:opacity-90 p-0 transition-all" +
              (selectedArt === art ? " p-1" : "")
            }
            key={art}
            onClick={() => setSelectedArt(art)}
          >
            <Image
              src={art}
              alt={`Mural Art ${index + 1}`}
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
      <p className="font-mono text-md text-center">Pick a building</p>
      <ul className="w-full h-1/3 flex border-y border-black bg-black">
        {muralBuildings.map((building, index) => (
          <li
            className={
              "w-1/3 hover:opacity-90 transition-all p-0" +
              (selectedBuilding === building ? " p-1" : "")
            }
            key={building}
            onClick={() => setSelectedBuilding(building)}
          >
            <Image
              src={building}
              alt={`Mural Building ${index + 1}`}
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
      <div className="flex justify-center p-8">
        <button
          className="font-mono p-2 px-5 bg-neutral-100 hover:bg-neutral-200 transition w-fit rounded-xl"
          onClick={generate}
          disabled={
            selectedArt === "" || selectedBuilding === "" || isGenerating
          }
        >
          GENERATE
        </button>
      </div>
    </div>
  );
}
