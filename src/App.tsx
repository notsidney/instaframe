import { useAtomValue } from "jotai";
import clsx from "clsx";
import { DownloadIcon } from "lucide-react";
import Canvas from "./Canvas";
import Controls from "./Controls";
import { imageAtom } from "./settings";

export default function App() {
	const image = useAtomValue(imageAtom);

	return (
		<main className="container mx-auto max-w-md p-4 pt-6 flex flex-col gap-4 select-none">
			<header>
				<h1 className="text-3xl font-semibold">Instaframe</h1>
			</header>

			<Controls />
			<Canvas />

			{image && (
				<div className="flex gap-2">
					<DownloadIcon />
					<span>
						<b className="font-semibold">To save:</b> Touch and hold &gt;
						Save&nbsp;to&nbsp;Photos
					</span>
				</div>
			)}

			<footer className="mt-auto text-sm text-slate-400 dark:text-slate-500 flex justify-between">
				<div>
					Made by{" "}
					<a
						href="https://sidney.me"
						target="_blank"
						rel="noopener"
						className="hover:text-primary-500 active:opacity-50 transition-colors font-medium"
					>
						Sidney
					</a>
				</div>

				<div>
					<a
						href="https://github.com/notsidney/instaframe"
						target="_blank"
						rel="noopener"
						className="hover:text-primary-500 active:opacity-50 transition-colors font-medium"
					>
						Source code
					</a>
				</div>
			</footer>
		</main>
	);
}
