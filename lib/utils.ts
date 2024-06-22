import { Customer, Organizer, User, Vendor } from "@prisma/client"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const eventPerPage = 10
export const userEventPerPage = 10
export const commentPerPage = 10

export interface Role {
  organizer: Organizer | null
  vendor: Vendor | null
  customer: Customer | null
}

export function getRoleFromUser(user: User & Role) {
  let user_role = null;
  if (user.role === "vendor") {
    user_role = user.vendor as Vendor
  } else if (user.role === "organizer") {
    user_role = user.organizer as Organizer
  } else {
    user_role = user.customer as Customer
  }
  return user_role
}