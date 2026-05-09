import { useRef, useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import {
	imageAtom,
	ratioAtom,
	colorAtom,
	widthAtom,
	minPaddingAtom,
	outputAtom,
} from "./atoms";

export default function Canvas() {
	const setOutput = useSetAtom(outputAtom);
	const image = useAtomValue(imageAtom);
	const ratio = useAtomValue(ratioAtom);
	const color = useAtomValue(colorAtom);
	const width = useAtomValue(widthAtom);
	const minPadding = useAtomValue(minPaddingAtom);

	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext("2d");
		const canvasRatio = ratio.x / ratio.y;

		if (!canvas || !ctx || !image) return;

		canvas.width = width;
		canvas.height = width / canvasRatio;
		ctx.fillStyle = color;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

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
		canvas.toBlob(
			(blob) => {
				if (!blob) return;
				const url = URL.createObjectURL(blob);
				setOutput({ url, blob });
			},
			"image/jpeg",
			80,
		);
	}, [ratio, color, image, minPadding, setOutput, width]);

	return <canvas id="canvas" ref={canvasRef} className="hidden" />;
}
