import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatter = new Intl.NumberFormat("en-US", {
  style: "decimal",
  maximumFractionDigits: 0 // Menghapus angka desimal
});

export const formatToIDR = (value: number): string => `${formatter.format(value)} IDR`;

