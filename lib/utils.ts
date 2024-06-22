import { Customer, Organizer, Vendor } from "@prisma/client"
import { Or } from "@prisma/client/runtime/library"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const eventPerPage = 10
export const userEventPerPage = 10
export const commentPerPage = 10

// オブジェクトの日付フィールドを Date 型に変換
export function stringToDate(obj: any) {
  return obj ? {
    ...obj,
    createdAt: new Date(obj.createdAt),
    updatedAt: new Date(obj.updatedAt),
  } : null;
}

export interface Role {
  organizer: Organizer | null
  vendor: Vendor | null
  customer: Customer | null
}
