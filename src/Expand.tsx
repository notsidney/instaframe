import clsx from "clsx";

export default function Expand({
	children,
	expanded,
}: React.PropsWithChildren<{ expanded: boolean }>) {
	return (
		<div
			className={clsx(
				"grid grid-rows-[0fr] transition-[grid-template-rows] overflow-hidden",
				expanded && "grid-rows-[1fr]",
			)}
		>
			<div
				className="min-h-0 transition-[visibility]"
				style={{ visibility: expanded ? "visible" : "hidden" }}
			>
				{children}
			</div>
		</div>
	);
}
