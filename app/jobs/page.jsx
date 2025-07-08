import React from 'react'
import InternshipCard from '@/components/all-inter'
import { Button } from '@/components/ui/button'

const INTERNSHIP = () => {
  return (
    <div>
      

      {/* Pass the type prop to InternshipCard */}
      <InternshipCard type="JOB" />
    </div>
  )
}

export default INTERNSHIP
