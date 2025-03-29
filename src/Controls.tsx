import { useState } from "react";
import { useAtom } from "jotai";
import clsx from "clsx";
import {
	ImageIcon,
	RectangleHorizontalIcon,
	RectangleVerticalIcon,
	SquareIcon,
	Settings2Icon,
} from "lucide-react";
import CustomControls from "./CustomControls";
import { RATIOS } from "./atoms";
import { imageAtom, ratioAtom, isRatioEqual } from "./atoms";

export default function Controls() {
	const [image, setImage] = useAtom(imageAtom);
	const [ratio, setRatio] = useAtom(ratioAtom);
	const [showCustomControls, setShowCustomControls] = useState(false);

	return (
		<section>
			<div className="flex gap-2 flex-wrap">
				<label
					className={clsx(
						"btn flex-grow relative",
						!image && "btn-primary",
						"truncate",
					)}
				>
					<ImageIcon aria-label="image" />
					Choose…
					<input
						type="file"
						accept="image/*"
						id="image"
						className="opacity-0 absolute inset-0 cursor-pointer"
						onChange={(e) => {
							const file = e.target.files?.[0];
							if (!file) return;
							const fr = new FileReader();
							fr.onload = () => {
								const img = new Image();
								img.onload = () => setImage(img);
								img.src = fr.result as string;
							};
							fr.readAsDataURL(file);
						}}
						onDragOver={(e) => {
							e.stopPropagation();
							e.preventDefault();
						}}
					/>
				</label>

				<div className="flex gap-2 grow-1">
					<div
						className={clsx("btn-group grid-cols-3 shrink-0 grow-1")}
						role="group"
					>
						{RATIOS.map((value) => {
							const valueRatio = value.x / value.y;
							let orientation = "";
							let Icon: typeof SquareIcon;

							if (valueRatio === 1) {
								orientation = "Square";
								Icon = SquareIcon;
							} else if (valueRatio < 1) {
								orientation = "Portrait";
								Icon = RectangleVerticalIcon;
							} else {
								orientation = "Landscape";
								Icon = RectangleHorizontalIcon;
							}

							const isActive = isRatioEqual(ratio, value);

							return (
								<button
									key={valueRatio}
									className={clsx("btn btn-icon", isActive && "btn-primary")}
									aria-pressed={isActive}
									onClick={() => setRatio(value)}
									disabled={!image}
									aria-label={`${orientation} (${value.x}:${value.y})`}
								>
									<Icon />
								</button>
							);
						})}
					</div>

					<button
						onClick={() => setShowCustomControls((s) => !s)}
						aria-expanded={showCustomControls}
						aria-label="Customize"
						className={clsx(
							"btn btn-icon",
							showCustomControls && "btn-primary",
						)}
					>
						<Settings2Icon />
					</button>
				</div>
			</div>

			<div
				className={clsx(
					"grid grid-rows-[0fr] transition-[grid-template-rows] overflow-hidden",
					showCustomControls && "grid-rows-[1fr]",
				)}
			>
				<div
					className="min-h-0 transition-[visibility]"
					style={{ visibility: showCustomControls ? "visible" : "hidden" }}
				>
					<div className="h-2" />
					<CustomControls />
				</div>
			</div>
		</section>
	);
}
