import { useRef } from "react";
import { useAtomValue } from "jotai";
import clsx from "clsx";
import {
	imageAtom,
	ratioAtom,
	colorAtom,
	widthAtom,
	minPaddingAtom,
} from "./atoms";

export default function Canvas() {
	const image = useAtomValue(imageAtom);
	const ratio = useAtomValue(ratioAtom);
	const color = useAtomValue(colorAtom);
	const width = useAtomValue(widthAtom);
	const minPadding = useAtomValue(minPaddingAtom);

	const containerRef = useRef<HTMLDivElement>(null);

	const canvasRatio = ratio.x / ratio.y;
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const canvas = canvasRef.current;
	const ctx = canvas?.getContext("2d");
	let outputDataURL = "";
	if (canvas && ctx) {
		canvas.width = width;
		canvas.height = width / canvasRatio;
		ctx.fillStyle = color;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		if (image) {
			const imageRatio = image.width / image.height;

			let x = minPadding;
			let y = minPadding;
			let w = image.width;
			let h = image.height;

			if (imageRatio >= canvasRatio) {
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
		<div ref={containerRef} className="w-full flex items-center">
			<a
				href={
					outputDataURL ||
					"data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
				}
				download
				className="w-full"
			>
				<img
					src={
						outputDataURL ||
						"data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
					}
					alt="Your image"
					className={clsx(
						"relative z-10 rounded-sm padding-0",
						"btn-base",
						"shadow-xl hover:shadow-xl",
						"dark:opacity-80 dark:hover:opacity-100",
						"select-all",
						"transition-all",
					)}
					width={width}
					height={width / canvasRatio}
					style={
						containerRef.current
							? {
									width: containerRef.current.offsetWidth,
									height: containerRef.current.offsetWidth / canvasRatio,
								}
							: undefined
					}
				/>
			</a>

			<canvas id="canvas" ref={canvasRef} className="hidden" />
		</div>
	);
}
