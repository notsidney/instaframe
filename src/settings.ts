import { atom } from "jotai";
import { atomWithStorage, RESET } from "jotai/utils";

function atomWithStorageAndReset<T>(key: string, initialValue: T) {
	const sourceAtom = atomWithStorage<T>(key, initialValue);
	const derivedAtom = atom<T, [T | typeof RESET], void>(
		(get) => get(sourceAtom),
		(_, set, nextValue) => {
			if (nextValue === RESET) set(sourceAtom, initialValue);
			else set(sourceAtom, nextValue);
		},
	);
	return derivedAtom;
}

export const imageAtom = atom<HTMLImageElement | undefined>();

export type Ratio = { x: number; y: number };
export const RATIOS: Ratio[] = [
	{ x: 4, y: 5 },
	{ x: 1, y: 1 },
	{ x: 1.91, y: 1 },
];
export const DEFAULT_RATIO: Ratio = RATIOS[0];
export const MIN_RATIO: Ratio = RATIOS.reduce(
	(acc, ratio) => (ratio.x / ratio.y < acc.x / acc.y ? ratio : acc),
	{ x: 1, y: 1 },
);
export const ratioAtom = atomWithStorageAndReset<Ratio>("ratio", DEFAULT_RATIO);
export const isRatioEqual = (a: Ratio, b: Ratio) => a.x === b.x && a.y === b.y;

export type Color = string;
export const DEFAULT_COLOR: Color = "#ffffff";
export const colorAtom = atomWithStorageAndReset<Color>("color", DEFAULT_COLOR);

export type Width = number;
export const DEFAULT_WIDTH: Width = 1440;
export const widthAtom = atomWithStorageAndReset<Width>("width", DEFAULT_WIDTH);

export type MinPadding = number;
export const DEFAULT_MIN_PADDING: MinPadding = 38;
export const minPaddingAtom = atomWithStorageAndReset<MinPadding>(
	"minPadding",
	DEFAULT_MIN_PADDING,
);
