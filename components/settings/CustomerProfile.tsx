"use client"

import { Customer } from "@prisma/client"

interface ProfileProps {
  customer: Customer
}

// プロフィール
const CustomerProfile = ({ customer }: ProfileProps) => {
  return (
    <div>
      <div className="text-xl font-bold text-center mb-5">イベント参加者プロフィール</div>
      <p>名前: {customer.customerName}</p>
    </div>
  )
}

export default CustomerProfile