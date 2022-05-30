import { useState, useRef } from "react";
import clsx from "clsx";

const CANVAS_WIDTH = 1440;
const MIN_PADDING = 38;

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ratio, setRatio] = useState<"square" | "full">("square");
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  const handleRatioChange = (newRatio: typeof ratio) => setRatio(newRatio);

  const canvas = canvasRef.current;
  let outputDataURL = "";
  if (canvas) {
    canvas.width = CANVAS_WIDTH;
    canvas.height = ratio === "square" ? CANVAS_WIDTH : (5 / 4) * CANVAS_WIDTH;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (image) {
      let x = MIN_PADDING;
      let y = MIN_PADDING;
      let w = image.width;
      let h = image.height;

      if (image.width >= image.height) {
        w = canvas.width - x * 2;
        h = image.height * (w / image.width);
        y = (canvas.height - h) / 2;
      } else {
        h = canvas.height - y * 2;
        w = image.width * (h / image.height);
        x = (canvas.width - w) / 2;
      }

      ctx.drawImage(image, x, y, w, h);
    }
    outputDataURL = canvas.toDataURL("image/jpeg", 80);
  }

  return (
    <main className="container mx-auto max-w-md p-4 flex flex-col gap-4">
      <h1 className="text-3xl font-semibold">Instaframe</h1>

      <div className="flex gap-2">
        <input
          type="file"
          id="image"
          className="opacity-0 w-px h-px absolute"
          onChange={(e) => {
            const file = e.target.files[0];
            const fr = new FileReader();
            fr.onload = () => {
              const img = new Image();
              img.onload = () => {
                if (img.height > img.width) setRatio("full");
                setImage(img);
              };
              img.src = fr.result as string;
            };
            fr.readAsDataURL(file);
          }}
        />
        <label
          className={clsx(
            "btn cursor-pointer flex-grow",
            !image && "btn-primary"
          )}
          htmlFor="image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>
            Choose
            <span className="hidden sm:inline"> image</span>…
          </span>
        </label>

        <div className="grid grid-cols-2 divide-x" role="group">
          <button
            className={clsx(
              "btn",
              "rounded-r-none",
              ratio === "square" && "btn-primary"
            )}
            aria-pressed={ratio === "square"}
            onClick={() => handleRatioChange("square")}
            disabled={!image}
          >
            Square
          </button>
          <button
            className={clsx(
              "btn",
              "rounded-l-none",
              ratio === "full" && "btn-primary"
            )}
            aria-pressed={ratio === "full"}
            onClick={() => handleRatioChange("full")}
            disabled={!image}
          >
            Full
          </button>
        </div>
      </div>

      {image && (
        <img
          src={outputDataURL}
          alt="Your image"
          className={clsx(
            "w-100 h-auto bg-white border border-slate-100 dark:border-slate-900 shadow-lg"
          )}
        />
      )}

      <canvas id="canvas" ref={canvasRef} className="hidden" />

      {image && (
        <div>
          <b>To save:</b> Touch the image and hold &gt; Add to Photos
        </div>
      )}
    </main>
  );
}
