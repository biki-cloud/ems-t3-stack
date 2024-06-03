import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const eventPerPage = 3
export const userEventPerPage = 3
export const commentPerPage = 3
