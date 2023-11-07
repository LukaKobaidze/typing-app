import { data } from "@/data";

export type TypemodeType = keyof typeof data.typemode;
export type TypemodeTime = (typeof data.typemode.time)[number];
export type TypemodeWords = (typeof data.typemode.words)[number];
export type ThemeType = (typeof data.theme)[number];
export type CaretStyleType = (typeof data.caret)[number];
