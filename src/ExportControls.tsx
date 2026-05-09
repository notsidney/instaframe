import { useEffect, useState } from "react";
import { ArrowDownToLineIcon, ShareIcon } from "lucide-react";
import clsx from "clsx";
import { useAtomValue } from "jotai";
import { outputAtom, fileNameAtom } from "./atoms";

export default function ExportControls() {
	const output = useAtomValue(outputAtom);
	const fileName = useAtomValue(fileNameAtom);
	const [webShareEnabled, setWebShareEnabled] = useState(false);

	useEffect(() => {
		if (!navigator.canShare) return;
		const file = new File([], "foo.jpg", { type: "image/jpeg" });
		setWebShareEnabled(navigator.canShare({ files: [file] }) || false);
	}, [output]);

	// Check mobile Safari: https://evilmartians.com/chronicles/how-to-detect-safari-and-ios-versions-with-ease
	const primaryAction =
		webShareEnabled && "ongesturechange" in window ? "share" : "download";

	return (
		<div
			className={clsx(
				"grid gap-2 flex-wrap",
				webShareEnabled ? "grid-cols-2" : "grid-cols-1",
			)}
		>
			<button
				onClick={() => {
					const link = document.createElement("a");
					link.href = output?.url!;
					link.download = fileName;
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
				}}
				disabled={!output}
				className={clsx("btn", primaryAction === "download" && "btn-primary")}
			>
				<ArrowDownToLineIcon />
				Download
			</button>

			{webShareEnabled && (
				<button
					onClick={() => {
						const file = new File([output?.blob!], fileName, {
							type: "image/jpeg",
						});
						navigator.share({ files: [file] });
					}}
					disabled={!output}
					className={clsx("btn", primaryAction === "share" && "btn-primary")}
				>
					<ShareIcon />
					Share
				</button>
			)}
		</div>
	);
}
