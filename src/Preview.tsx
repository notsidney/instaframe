import { useRef } from "react";
import { useAtomValue } from "jotai";
import clsx from "clsx";
import { imageAtom, ratioAtom, widthAtom, outputAtom } from "./atoms";

export default function Preview() {
	const output = useAtomValue(outputAtom);
	const image = useAtomValue(imageAtom);
	const ratio = useAtomValue(ratioAtom);
	const width = useAtomValue(widthAtom);

	const containerRef = useRef<HTMLDivElement>(null);

	const canvasRatio = ratio.x / ratio.y;

	return (
		<div ref={containerRef} className="w-full">
			<img
				src={
					output?.url ||
					"data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
				}
				alt="Your image"
				className={clsx(
					"relative z-10 rounded-sm padding-0",
					"btn-base bg-none",
					"border-1 border-slate-500/20 border-b-slate-500/40",
					"dark:border-1 dark:border-slate-950/30 dark:border-b-slate-950/40",
					"shadow-xl shadow-slate-500/20 dark:shadow-slate-950/20",
					"select-all",
					"transition-all",
					!image && "pointer-events-none cursor-default",
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
		</div>
	);
}
