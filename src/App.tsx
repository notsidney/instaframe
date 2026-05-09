import { useSetAtom } from "jotai";
import { useDropzone } from "react-dropzone";
import { imageAtom, fileNameAtom } from "./atoms";
import Controls from "./Controls";
import Canvas from "./Canvas";
import Preview from "./Preview";
import ExportControls from "./ExportControls";

export default function App() {
	const setImage = useSetAtom(imageAtom);
	const setFileName = useSetAtom(fileNameAtom);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop: (acceptedFiles) => {
			const file = acceptedFiles[0];
			if (!file) return;

			const fileName =
				"instaframe-" +
				file.name.replace(".jpeg", "").replace(".jpg", "") +
				".jpg";
			setFileName(fileName);

			const fr = new FileReader();
			fr.onload = () => {
				const img = new Image();
				img.onload = () => setImage(img);
				img.src = fr.result as string;
			};
			fr.readAsDataURL(file);
		},
		accept: { "image/*": [] },
		multiple: false,
		noClick: true,
		noKeyboard: true,
	});

	return (
		<div {...getRootProps()} className="w-full min-w-dvw h-full min-h-dvh">
			<main className="container mx-auto max-w-md p-4 pt-6 flex flex-col gap-4 select-none">
				<header>
					<h1 className="text-3xl font-semibold">Instaframe</h1>
				</header>

				<Controls getDropzoneInputProps={getInputProps} />
				<Canvas />
				<Preview />
				<ExportControls />

				<footer className="mt-auto pt-2 text-sm text-slate-500 dark:text-slate-400 flex justify-between">
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
		</div>
	);
}
