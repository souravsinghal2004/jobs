"use client"

import React from 'react'
import JobCard from '@/components/job-card'
import { getJobsByCompany, getJobsBylocation, getJobsBypay, getJobsByType } from '@/actions/server'
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';


export default async function Internship () {
  
 const [filter, setFilter] = useState(false)
  const jobs = await getJobsByType("INTERNSHIP"); // ✅ this works in server component




    // 👇 Handler functions
   async function  handleCompany  ()  {
    setFilter(true)
   const jobs = await getJobsByCompany(companyName);
  }

async function  handleLocation  ()  {
    setFilter(true)
   const jobs = await getJobsBylocation(location);
  }
  async function  handlePay  ()  {
    setFilter(true)
   const jobs = await getJobsBypay(pay);
  }

  const Filter = false;
  return (

 <div className='py-20 container  '>
 
  <div className='bg-white container grid grid-cols-3 '>

<Button onClick={handleCompany}>Company</Button>
        <Button onClick={handleLocation}>Location</Button>
        <Button onClick={handlePay}>Pay</Button>
   
 
     

  </div>

  {!Filter && (

       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
         {jobs.map((job) => (
           <JobCard key={job.id} job={job} />
         ))}
       </div>
  )}
 </div>
  )
}

