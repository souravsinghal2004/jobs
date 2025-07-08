'use client' // Required for client-side routing with useRouter

import { useRouter } from 'next/navigation'
import { useState } from 'react'

const CompanySelector = () => {
  const router = useRouter()
  const [selectedCompany, setSelectedCompany] = useState('')

  const handleChange = (e) => {
    const company = e.target.value
    if (company) {
      router.push(`/company/${company}`)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <select
        value={selectedCompany}
        onChange={handleChange}
        className="border p-2 rounded-md"
      >
        <option className='bg-white text-black' value="">Select a company</option>
        <option className='bg-white text-black' value="Google">Google</option>
        <option className='bg-white text-black' value="Infosys">Infosys</option>
        <option className='bg-white text-black' value="Tata">Tata</option>
        <option className='bg-white text-black' value="Amazon">Amazon</option>
      </select>
    </div>
  )
}

export default CompanySelector
