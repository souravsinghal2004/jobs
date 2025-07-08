'use client'

import React, { useState } from 'react'
import InternshipCard from '@/components/all-inter'
import JobCard from '@/components/job-card'
import { getInternshipsByLocation, getInternshipsByPayRange } from '@/actions/server'

const INTERNSHIP = () => {
  const [filterType, setFilterType] = useState(null)
  const [results, setResults] = useState([])
  const [location, setLocation] = useState('')
  const [salaryRange, setSalaryRange] = useState('')
  const [company, setCompany] = useState('')

  const handleSalaryFilter = async (range) => {
    setFilterType('salary')
    const [minRaw, maxRaw] = range.split('-').map(Number)
    const min = Math.floor(minRaw / 1000)
    const max = Math.ceil(maxRaw / 1000)
    const data = await getInternshipsByPayRange(min, max)
    setResults(data)
  }

  const handleLocationFilter = async (loc) => {
    setFilterType('location')
    const data = await getInternshipsByLocation(loc)
    setResults(data)
  }
  return (
    <div className="space-y-6 px-6 py-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {/* Salary Filter */}
        <select
          className="border p-2 rounded-md"
          value={salaryRange}
          onChange={(e) => {
            setSalaryRange(e.target.value)
            handleSalaryFilter(e.target.value)
          }}
        >
               
  <option className="bg-white text-black" value="">
    Filter By Salary Range
  </option>
  <option className="bg-white text-black" value="0-10000">
    ₹0 -         ₹10,000/month
  </option>
  <option className="bg-white text-black" value="10000-20000">
    ₹10,000 - ₹20,000/month
  </option>
  <option className="bg-white text-black" value="20000-40000">
    ₹20,000 - ₹40,000/month
  </option>
  <option className="bg-white text-black" value="40000-60000">
    ₹40,000 - ₹60,000/month
  </option>
  <option className="bg-white text-black" value="60000-80000">
    ₹60,000 - ₹80,000/month
  </option>
  <option className="bg-white text-black" value="80000-100000">
    ₹80,000 - ₹1,00,000/month
  </option>
  <option className="bg-white text-black" value="100000-150000">
    ₹1,00,000 - ₹1,50,000/month
  </option>
  <option className="bg-white text-black" value="150000-300000">
    ₹1,50,000 - ₹3,00,000/month
  </option>
  <option className="bg-white text-black" value="300000-9000000">
    ₹3,00,000+/month
  </option>
        </select>

        {/* Location Filter */}
        <select
          className="border p-2 rounded-md"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value)
            handleLocationFilter(e.target.value)
          }}
        >
          <option className="bg-white text-black" value="">Filter By Location</option>
  <option className="bg-white text-black" value="Bangalore">Bangalore</option>
  <option className="bg-white text-black" value="Delhi">Delhi</option>
  <option className="bg-white text-black" value="Hyderabad">Hyderabad</option>
  <option className="bg-white text-black" value="Noida">Noida</option>
  <option className="bg-white text-black" value="Gurgaon">Gurgaon</option>
  <option className="bg-white text-black" value="Chennai">Chennai</option>
  <option className="bg-white text-black" value="Mumbai">Mumbai</option>
  <option className="bg-white text-black" value="Pune">Pune</option>
  <option className="bg-white text-black" value="Ahmedabad">Ahmedabad</option>
  <option className="bg-white text-black" value="Chandigarh">Chandigarh</option>
  <option className="bg-white text-black" value="Remote">Remote</option>
        </select>

        {/* Company Filter */}
      
      </div>

      {/* Default: show all internships */}
      {!filterType && <InternshipCard type="INTERNSHIP" />}

      {/* Show filtered results */}
      {filterType && (
       results.length === 0 ? (
         <div className="flex items-center justify-center h-96">
           <h1 className="text-3xl sm:text-4xl font-semibold text-white text-center">
             No jobs found.
           </h1>
         </div>
       ) : (
         <div className="grid  sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
           {results.map((job) => (
             <JobCard key={job.id} job={job} />
           ))}
         </div>
       )
     )}
    </div>
  )
}

export default INTERNSHIP
