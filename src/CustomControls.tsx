import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { RESET } from "jotai/utils";
import clsx from "clsx";
import { ratioAtom, colorAtom, widthAtom, minPaddingAtom } from "./atoms";

export default function CustomControls() {
	const [ratio, setRatio] = useAtom(ratioAtom);
	const [color, setColor] = useAtom(colorAtom);
	const [width, setWidth] = useAtom(widthAtom);
	const [minPadding, setMinPadding] = useAtom(minPaddingAtom);

	const [x, setX] = useState(`${ratio.x}`);
	const [y, setY] = useState(`${ratio.y}`);
	const [isDirty, setIsDirty] = useState(false);
	useEffect(() => {
		if (isDirty) return;
		setX(`${ratio.x}`);
		setY(`${ratio.y}`);
	}, [ratio, isDirty]);

	const reset = () => {
		setRatio(RESET);
		setColor(RESET);
		setWidth(RESET);
		setMinPadding(RESET);
	};

	return (
		<div
			className={clsx(
				"recessed rounded-3xl",
				"w-full grid grid-cols-[max-content_1fr] items-center gap-x-8 gap-y-3",
				"p-5",
			)}
		>
			<fieldset className="contents">
				<legend>Ratio</legend>

				<div className="flex grow-1 gap-1 items-center">
					<input
						type="text"
						inputMode="numeric"
						pattern="[0-9.]*"
						value={x}
						onChange={(e) => {
							setIsDirty(true);
							setX(e.target.value);
							const x = Number(e.target.value);
							if (x > 0) setRatio({ ...ratio, x });
						}}
						aria-label="X"
						className="input"
					/>
					<span>:</span>
					<input
						type="text"
						inputMode="numeric"
						pattern="[0-9.]*"
						value={y}
						onChange={(e) => {
							setIsDirty(true);
							setY(e.target.value);
							const y = Number(e.target.value);
							if (y > 0) setRatio({ ...ratio, y });
						}}
						aria-label="Y"
						className="input text-left"
					/>
				</div>
			</fieldset>

			<label className="contents" htmlFor="color">
				Color
			</label>
			<div className="flex gap-2 items-stretch">
				<input
					type="text"
					id="color"
					value={color}
					onChange={(e) => setColor(e.target.value)}
					className="input"
				/>
				<input
					type="color"
					value={color}
					onChange={(e) => setColor(e.target.value)}
					aria-label="Color"
					className="input shrink-0 w-8 h-8 box-content"
				/>
			</div>

			<label className="contents">
				Width
				<div className="relative">
					<input
						type="text"
						inputMode="numeric"
						pattern="[0-9]*"
						value={width}
						onChange={(e) => setWidth(Number(e.target.value))}
						className="input pr-8"
					/>
					<span className="font-normal opacity-60 absolute top-0 right-3 leading-8 border-1 border-transparent">
						px
					</span>
				</div>
			</label>

			<label className="contents">
				Padding
				<div className="relative">
					<input
						type="text"
						inputMode="numeric"
						pattern="[0-9]*"
						value={minPadding}
						onChange={(e) => setMinPadding(Number(e.target.value))}
						className="input pr-8"
					/>
					<span className="font-normal opacity-60 absolute top-0 right-3 leading-8 border-1 border-transparent">
						px
					</span>
				</div>
			</label>

			<button onClick={reset} className="btn btn-sm col-span-full mt-3">
				Reset
			</button>
		</div>
	);
}
