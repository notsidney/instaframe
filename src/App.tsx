import Controls from "./Controls";
import Canvas from "./Canvas";
import Preview from "./Preview";
import ExportControls from "./ExportControls";

export default function App() {
	return (
		<main className="container mx-auto max-w-md p-4 pt-6 flex flex-col gap-4 select-none">
			<header>
				<h1 className="text-3xl font-semibold">Instaframe</h1>
			</header>

			<Controls />
			<Canvas />
			<Preview />
			<ExportControls />

			<footer className="mt-auto text-sm text-slate-500 dark:text-slate-400 flex justify-between">
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
