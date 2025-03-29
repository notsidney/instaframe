import { useAtom } from "jotai";
import { RESET } from "jotai/utils";
import clsx from "clsx";
import { ratioAtom, colorAtom, widthAtom, minPaddingAtom } from "./atoms";

export default function CustomControls() {
	const [ratio, setRatio] = useAtom(ratioAtom);
	const [color, setColor] = useAtom(colorAtom);
	const [width, setWidth] = useAtom(widthAtom);
	const [minPadding, setMinPadding] = useAtom(minPaddingAtom);

	const reset = () => {
		setRatio(RESET);
		setColor(RESET);
		setWidth(RESET);
		setMinPadding(RESET);
	};

	return (
		<div
			className={clsx(
				"recessed rounded-2xl",
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
						defaultValue={ratio.x}
						onChange={(e) => {
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
						defaultValue={ratio.y}
						onChange={(e) => {
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
					className="block w-8 h-8"
				/>
			</div>

			<label className="contents">
				Width
				<input
					type="text"
					inputMode="numeric"
					pattern="[0-9]*"
					value={width}
					onChange={(e) => setWidth(Number(e.target.value))}
					className="input"
				/>
			</label>

			<label className="contents">
				Padding
				<input
					type="text"
					inputMode="numeric"
					pattern="[0-9]*"
					value={minPadding}
					onChange={(e) => setMinPadding(Number(e.target.value))}
					className="input"
				/>
			</label>

			<button onClick={reset} className="btn btn-sm col-span-full mt-3">
				Reset
			</button>
		</div>
	);
}
