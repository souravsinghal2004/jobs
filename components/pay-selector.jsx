'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

const PaySelector = () => {
  const router = useRouter()
  const [selectedPay, setSelectedPay] = useState('')

  const handleChange = (e) => {
    const value = e.target.value
    if (value) {
      router.push(`/pay/${value}`) // navigates to pay range page
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <select
        value={selectedPay}
        onChange={handleChange}
        className="border p-2 rounded-md"
      >
        <option className="bg-white text-black" value="">
          Select a salary range
        </option>
        <option className="bg-white text-black" value="0-10000">
          ₹0 - ₹10,000/month
        </option>
        <option className="bg-white text-black" value="10000-20000">
          ₹10,000 - ₹20,000/month
        </option>
        <option className="bg-white text-black" value="20000-40000">
          ₹20,000 - ₹40,000/month
        </option>
        <option className="bg-white text-black" value="40000-1000000">
          ₹40,000+
        </option>
      </select>
    </div>
  )
}

export default PaySelector
