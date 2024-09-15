import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { parseDate } from "@internationalized/date";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getParsedDate(date: string) {
    return date ? parseDate(date.toString()) : null;
}
