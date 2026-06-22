import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatterCentimeter = new Intl.NumberFormat("en-US", {
  style: "unit",
  unit: "centimeter",
  unitDisplay: "long"
});