"use client";

interface GenerateButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export default function GenerateButton({
  onClick,
  disabled,
}: GenerateButtonProps) {
  return (
    <div className="flex justify-center p-8">
      <button
        className="font-mono p-2 px-5 bg-neutral-100 hover:bg-neutral-200 transition w-fit rounded-xl"
        onClick={onClick}
        disabled={disabled}
      >
        GENERATE
      </button>
    </div>
  );
}
