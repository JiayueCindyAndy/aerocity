import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatterMetter = new Intl.NumberFormat("en-US", {
  style: "unit",
  unit: "meter",
  unitDisplay: "long" // Menampilkan satuan secara singkat, misalnya "m"
});
