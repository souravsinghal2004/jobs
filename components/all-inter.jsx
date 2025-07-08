"use client"
import { useState, useEffect } from "react"
import { getJobsByType } from "@/actions/server"
import JobCard from "@/components/job-card"



export default function InternshipCard({ type }) {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getJobsByType(type)
      setJobs(data)
    }
    fetchJobs()
  }, [type]) // Add `type` as dependency in case it changes

  return (
    <div className='py-20 container'>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  )
}
