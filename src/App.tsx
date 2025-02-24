import { useState, useRef } from "react";
import clsx from "clsx";

const CANVAS_WIDTH = 4320;
const MIN_PADDING = 90;
type ratio = "square" | "full" | "landscape";

const RATIOS = {
  square: {
    label: "Square",
    width: 1,
    height: 1
  },
  full: {
    label: "Portrait",
    width: 4,
    height: 5,
  },
  landscape: {
    label: "Landscape",
    width: 5,
    height: 4
  }
}

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ratio, setRatio] = useState<ratio>("square");
  const [BGColor, setBGColor] = useState<String>("white");
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  const handleRatioChange = (newRatio: typeof ratio) => setRatio(newRatio);

  const canvas = canvasRef.current;
  let outputDataURL = "";
  if (canvas) {
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_WIDTH * RATIOS[ratio].height / RATIOS[ratio].width;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = BGColor;
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
    <main className="container mx-auto max-w-md px-1 py-1 flex flex-col gap-4 select-none">
      <header>
        <h1 className="text-3xl font-semibold">Instaframe</h1>
      </header>

      <div className="flex gap-3">
        <input
          type="file"
          accept="image/*"
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

        <div
          className="grid grid-cols-3 btn p-1 gap-0 hover:bg-slate-100 dark:hover:bg-slate-800 active:opacity-100"
          role="group"
        >
          <button
            className={clsx(
              "btn rounded-lg py-1",
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
              "btn rounded-lg py-1",
              ratio === "full" && "btn-primary"
            )}
            aria-pressed={ratio === "full"}
            onClick={() => handleRatioChange("full")}
            disabled={!image}
          >
            Portrait
          </button>
          <button
            className={clsx(
              "btn rounded-lg py-1 ",
              ratio === "landscape" && "btn-primary"
            )}
            aria-pressed={ratio === "full"}
            onClick={() => handleRatioChange("landscape")}
            disabled={!image}
          >
            Landscape
          </button>
        </div>
      </div>
      <div
          className="grid grid-cols-2 btn p-1 p-3 gap-0 hover:bg-slate-100 dark:hover:bg-slate-800 active:opacity-100"
          role="group"
        >
          <button
            className={clsx(
              "btn rounded-lg py-1",
              BGColor === "white" && "btn-primary"
            )}
            aria-pressed={BGColor === "white"}
            onClick={() => setBGColor("white")}
            disabled={!image}
          >
            White
          </button>
          <button
            className={clsx(
              "btn rounded-lg py-1",
              BGColor === "black" && "btn-primary"
            )}
            aria-pressed={BGColor === "black"}
            onClick={() => setBGColor("black")}
            disabled={!image}
          >
            Black
          </button>
        </div>
      <a
        href={
          outputDataURL ||
          "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
        }
        download
      >
        <img
          src={
            outputDataURL ||
            "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
          }
          alt="Your image"
          className={clsx(
            "w-full relative z-10",
            "bg-white",
            "border border-slate-200 border-t-slate-100 border-b-slate-300 dark:border-slate-900 shadow-xl",
            "shadow-slate-300 dark:shadow-slate-900",
            "dark:opacity-80 dark:hover:opacity-100 dark:transition-opacity",
            "select-all",
            `aspect-${ratio}`
          )}
        />
      </a>

      <canvas id="canvas" ref={canvasRef} className="hidden" />

      <div
        className={clsx(
          "flex gap-2",
          "bg-slate-100 dark:bg-slate-800 rounded-lg py-2 px-4",
          !image && "text-slate-100 dark:text-slate-800"
        )}
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
            d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
          />
        </svg>
        <span>
          <b className="font-semibold">To save:</b>
          <br />
          Touch and hold the image &gt; Add&nbsp;to&nbsp;Photos
        </span>
      </div>

      <footer className="text-sm text-slate-400 dark:text-slate-500 flex justify-between">
        <div>
          Made by{" "}
          <a
            href="https://twitter.com/nots_dney"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-500 active:opacity-50 transition-colors font-medium"
          >
            @nots_dney
          </a>
          <a className="opacity-80"> and contributors</a>
        </div>

        <div>
          <a
            href="https://github.com/notsidney/instaframe"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-500 active:opacity-50 transition-colors font-medium"
          >
            Source code
          </a>
        </div>
      </footer>
    </main>
  );
}
